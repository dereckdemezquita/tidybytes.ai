import React, { useState } from 'react';
import styled from 'styled-components';

interface FileUploadProps {
    uploadEndPoint: string;
    acceptedFileTypes: string[];
}

const FileUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f5f5f5;
`;

const UploadButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: #008CBA; /* Blue */
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;

    &:hover {
        background: #007399; /* Darker blue */
        color: white;
    }
`;

const FileUpload: React.FC<FileUploadProps> = ({ uploadEndPoint, acceptedFileTypes }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [isFileTypeValid, setIsFileTypeValid] = useState<boolean>(true);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            const extension = selectedFile.name.split('.').pop() || '';

            setFile(selectedFile);
            setFileType(extension);
            setIsFileTypeValid(acceptedFileTypes.includes(extension));
        }
    };

    const handleFileUpload = async () => {
        if (!file || !isFileTypeValid) {
            alert("File is not selected or its type is not supported");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        
        // Send the file data to your server
        try {
            const response = await fetch(uploadEndPoint, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error("Something went wrong while uploading the file");
            }

            console.log("File uploaded successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FileUploadContainer>
            <input type="file" onChange={handleFileChange} />
            <p>{!isFileTypeValid && 'The selected file type is not supported'}</p>
            <UploadButton onClick={handleFileUpload}>Upload</UploadButton>
            <div>Data Type: {fileType}</div>
        </FileUploadContainer>
    );
};


export default FileUpload;
