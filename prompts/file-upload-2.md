Here is the code I have at the moment.

I want to change somethings. Please look it over make sure there are no mistakes first and see if there are ways to make it better.

The primary goal is the following:

1. I want you to allow for multiple file selection and upload. The progress bar should show the total progress of all files. The toast should show the total number of files uploaded and the total number of files that failed to upload.

Here is the code:

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Button, Toast } from './StyledComponents';
import ProgressBar from './ProgressBar';

interface FileUploadProps {
    uploadEndPoint: string;
    acceptedFileTypes: string[];
}

const FileUploadContainer = styled.div<{ uploadStatus: 'idle' | 'dropped' | 'uploading' | 'success' | 'error' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border: 2px dashed ${props => {
        switch (props.uploadStatus) {
            case 'idle': return '#ccc';
            case 'dropped': return '#007bff';
            case 'uploading': return '#ffc107';
            case 'success': return '#28a745';
            case 'error': return '#b30000';
        }
    }};
    border-radius: 5px;
    background: ${props => {
        switch (props.uploadStatus) {
            case 'idle': return '#f5f5f5';
            case 'dropped': return '#eff8ff';
            case 'uploading': return '#fff3cd';
            case 'success': return '#d4edda';
            case 'error': return '#ffe6e6';
        }
    }};
    cursor: pointer;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const DropzoneContainer = styled.div<{ uploadStatus: 'idle' | 'dropped' | 'uploading' | 'success' | 'error' }>`
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-size: 20px;
    color: ${props => {
        switch (props.uploadStatus) {
            case 'idle': return '#6c757d';
            case 'dropped': return '#007bff';
            case 'uploading': return '#ffc107';
            case 'success': return '#28a745';
            case 'error': return '#b30000';
        }
    }};
    animation: ${fadeIn} 0.5s ease-out;
`;

const FileUpload: React.FC<FileUploadProps> = ({ uploadEndPoint, acceptedFileTypes }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'dropped' | 'uploading' | 'success' | 'error'>('idle');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        const extension = selectedFile.name.split('.').pop() || '';

        setFile(selectedFile);
        setFileType(extension);

        if (!acceptedFileTypes.includes(extension)) {
            setUploadStatus('error');
            setToastMessage(`File '${extension}' not supported.`);
        } else {
            setUploadStatus('dropped');
            setToastMessage(`File '${selectedFile.name}'. Click upload to start.`);
        }
    }, [acceptedFileTypes]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleFileUpload = async () => {
        if (!file || uploadStatus === 'error') return;

        const formData = new FormData();
        formData.append('file', file);

        setUploadStatus('uploading');
        setToastMessage('Uploading...');

        try {
            await axios.post(uploadEndPoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;

                    setProgress(percentCompleted);
                }
            });

            setUploadStatus('success');
            setToastMessage(`File '${file.name}' uploaded.`);
        } catch (error) {
            setUploadStatus('error');
            setToastMessage(`Error uploading: '${file.name}'. Please try again.`);
        }
    };

    return (
        <FileUploadContainer uploadStatus={uploadStatus} {...getRootProps()}>
            <DropzoneContainer uploadStatus={uploadStatus}>
                <input {...getInputProps()} />
                <p>Drag & drop</p>
            </DropzoneContainer>
            <Toast show={uploadStatus !== 'idle'} type={uploadStatus === 'error' ? 'error' : 'success'} >
                {toastMessage}
            </Toast>
            <div>Data Type: {fileType}</div>
            <Button onClick={handleFileUpload} disabled={uploadStatus === 'uploading' || uploadStatus === 'error'}>
                Upload
            </Button>
            <ProgressBar progress={uploadStatus === 'uploading' ? progress : 0} isError={uploadStatus === 'error'} />
        </FileUploadContainer>
    );
};

export default FileUpload;


// StyledComponents.tsx is a file that contains all the styled components used site wide
import styled, { keyframes } from 'styled-components';

export const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
`;

export const Title = styled.h1`
    color: #343a40;
    font-size: 3em;
    text-align: center;

    &:after {
        content: '';
        display: block;
        width: 100px;
        height: 5px;
        background-color: #007bff;
        margin: 10px auto;
    }
`;

export const SubTitle = styled.h2<{ color: string, weight: string }>`
    color: ${props => props.color};
    font-size: 2em;
    font-weight: ${props => props.weight};
    text-align: center;
`;

export const Description = styled.section`
    color: #6c757d;
    font-size: 1.2em;
    text-align: center;
    max-width: 650px;
    margin-top: 20px;
`;

export const Section = styled.section<{ backgroundColor?: string }>`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Button = styled.button<{
    color?: string,
    hoverColor?: string,
    padding?: number[],
    margin?: number[],
}>`
    background-color: ${props => props.color || '#007bff'};
    color: white;
    padding: ${props => props.padding ? `${props.padding[0]}px ${props.padding[1]}px` : '10px 20px'};
    margin: ${props => props.margin ? `${props.margin[0]}px ${props.margin[1]}px` : '10px 10px'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.hoverColor || '#0056b3'};
    }
`;

const fadeInOut = keyframes`
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
`;

export const Toast = styled.div<{
    show: boolean,
    type: 'error' | 'success',
    fixedPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | {
        top?: number,
        right?: number,
        bottom?: number,
        left?: number,
    }
}>`
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    opacity: ${props => props.show ? 1 : 0};
    transition: opacity 1s;
    animation: ${fadeInOut} 5s;

    padding: 10px;
    /* text and all content centred */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /* if fixedPosition is passed then position toast accordingly */
    ${props => props.fixedPosition ? `
        position: fixed;
        ${typeof props.fixedPosition === 'string' ? props.fixedPosition : `
            ${props.fixedPosition.top ? `top: ${props.fixedPosition.top}px;` : ''}
            ${props.fixedPosition.right ? `right: ${props.fixedPosition.right}px;` : ''}
            ${props.fixedPosition.bottom ? `bottom: ${props.fixedPosition.bottom}px;` : ''}
            ${props.fixedPosition.left ? `left: ${props.fixedPosition.left}px;` : ''}
        `}
    ` : ''}

    background-color: ${props => props.type === 'error' ? '#dc3545' : '#28a745'};
    color: white;
    border-radius: 5px;
`;

import styled, { css, keyframes } from 'styled-components';

const animateStripes = keyframes`
    to {
        background-position: 100% 0;
    }
`;

const ProgressBar = styled.div<{ progress: number, isError: boolean }>`
    width: 100%;
    height: 20px;
    background-color: #9f9f9f;
    border-radius: 3px;
    margin: 5px 0;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: ${props => `${props.progress}%`};
        height: 100%;
        background: linear-gradient(to right, gray, ${props => props.isError ? 'red' : `rgba(0, 128, 0, ${props.progress / 100})`});
        border-radius: 3px;

        background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.3) 10px, rgba(255, 255, 255, 0.3) 20px);
        background-size: 28.28px 28.28px;

        animation: ${props => props.isError ? 'none' : css`${animateStripes} 1s linear infinite`};
    }
`;

export default ProgressBar;
