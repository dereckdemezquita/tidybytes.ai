import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authJWT(req: Request, res, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assumes 'Bearer TOKEN'

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decodedToken; // Store the user's details for use in the route handler

    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    next(); // Move to the next middleware or route handler
}