// client/src/LandingPage.tsx

import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
`;

const Title = styled.h1`
    color: #343a40;
    font-size: 3em;
    text-align: center;
`;

const Description = styled.p`
    color: #6c757d;
    font-size: 1.2em;
    text-align: center;
    max-width: 800px;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    margin-top: 50px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

interface LandingPageProps {
    setShowLoginForm: (show: boolean) => void;
    setShowRegisterForm: (show: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setShowLoginForm, setShowRegisterForm }) => {
    return (
        <PageContainer>
            <Title>Welcome to Our Web Application</Title>
            <Description>
                This is a platform where you can upload CSV files for processing.
                You can create an account, log in, and use our application to easily handle CSV files.
            </Description>
            <Button onClick={() => setShowRegisterForm(true)}>
                Create an Account
            </Button>
            <Button onClick={() => setShowLoginForm(true)}>
                Log In
            </Button>
        </PageContainer>
    );
};

export default LandingPage;