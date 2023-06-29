// server/src/upload.ts

import express from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import XLSX from 'xlsx';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import path from 'path';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const uploadTabSchema = new mongoose.Schema({
    user: { type: String, required: true },
    dataTypes: { type: Object, required: true },
    dateTimeOfUpload: { type: Date, required: true },
    dimensions: { type: Object, required: true },
    data: { type: Array, required: true },
});

const UploadTab = mongoose.model('UploadTab', uploadTabSchema);

router.post('/api/upload/tabular', upload.single('file'), async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET!) as any;

        const fileBuffer = await fs.readFile(req.file.path);

        let data;
        let dimensions;
        let dataTypes = {};

        if (req.file.originalname.endsWith('.csv')) {
            const csv = fileBuffer.toString();
            data = Papa.parse(csv, { header: true }).data;
        } else if (req.file.originalname.endsWith('.xlsx')) {
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0]; // Assume the first sheet is what user wants
            data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } else {
            throw new Error('Unsupported file type');
        }

        dimensions = {
            rows: data.length,
            columns: Object.keys(data[0]).length
        };

        for (let key in data[0]) {
            let type = typeof data[0][key];
            dataTypes[key] = type;
        }

        // Coerce data
        data = data.map((row: any) => {
            let newRow: any = {};
            for (let key in row) {
                newRow[key] = coerceTo(row[key], dataTypes[key]);
            }
            return newRow;
        });

        const uploadTab = new UploadTab({
            user: userId,
            dataTypes,
            dateTimeOfUpload: new Date(),
            dimensions,
            data,
        });

        const savedUploadTab = await uploadTab.save();

        // Send the first 15 rows and the first 10 columns
        const previewData = data.slice(0, 15).map((row: any) => {
            let newRow: any = {};
            let columnCount = 0;
            for (let key in row) {
                if (columnCount >= 10) break;
                newRow[key] = row[key];
                columnCount++;
            }
            return newRow;
        });

        res.status(200).json({
            success: true,
            data: previewData,
            dataTypes: Object.fromEntries(
                Object.entries(dataTypes).slice(0, 10)
            ),
        });
        
        // Remove the file
        await fs.unlink(req.file.path);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

function coerceTo(value: any, type: string) {
    switch (type) {
        case 'number':
            return Number(value);
        case 'boolean':
            return Boolean(value);
        case 'string':
        default:
            return String(value);
    }
}

export default router;
