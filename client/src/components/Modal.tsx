// client/src/Modal.tsx

import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    border: none;
    font-size: 1.4em;
    cursor: pointer;
`;

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
    <Overlay>
        <ModalContainer>
            <CloseButton onClick={onClose}>X</CloseButton>
            {children}
        </ModalContainer>
    </Overlay>
);

export default Modal;
