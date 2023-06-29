// client/src/components/ErrorModal.tsx

import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    background-color: #fff;
    color: red;
    padding: 20px;
    width: fit-content;
    text-align: center;
`;

const ErrorText = styled.p`
    font-weight: 500;
    margin: 0;
`;

interface ErrorModalProps {
    errorMessage: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onClose }) => (
    <Modal onClose={onClose}>
        <ErrorContainer>
            <ErrorText>{errorMessage}</ErrorText>
        </ErrorContainer>
    </Modal>
);

export default ErrorModal;