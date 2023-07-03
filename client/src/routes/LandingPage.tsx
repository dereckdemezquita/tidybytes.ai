import React, { useEffect, useState } from 'react';
import { Button } from '@blueprintjs/core';
import { Modal } from '../components/base/Modal';
import { LoginForm, RegistrationForm } from '../components/base/AuthForms';
import { useAuthModal } from '../hooks/useAuthModal';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../modules/helpers';

const fadeInRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.title};
    animation: ${fadeInRight} 1s ease-out;

    &:after {
        content: '';
        display: block;
        width: 150px;
        height: 5px;
        background-color: #007bff;
        margin: 10px auto;
    }
`;

const Subtitle = styled.h2`
    max-width: 600px;
    margin-bottom: ${({ theme }) => theme.spacing.large};
    font-size: ${({ theme }) => theme.fontSizes.subtitle};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    animation: ${fadeInUp} 1s ease-out;
`;

const Description = styled.section`
    color: #6c757d;
    font-size: 1.2em;
    text-align: center;
    max-width: 500px;
    margin-top: 20px;
`;

const Section = styled.section`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonGroup = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 25px;
`;

export const LandingPage = () => {
    const { modal, openModal, closeModal } = useAuthModal();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedin] = useState<boolean>(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isUserLoggedIn();
            setIsLoggedin(loggedIn);
        };
        checkLoginStatus();
    }, []);

    return (
        <Container>
            <Section>
                <Title>TidyBytes.io</Title>
                <Subtitle>Data cleansing made easy!</Subtitle>
                <Description>
                    A webapp that hosts a suite of tools for working with and cleaning up datasets using ML models in the background.
                </Description>
            </Section>
            <Section>
                <ButtonGroup>
                    {
                        isLoggedIn ?
                            <Button intent="success" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                            :
                            <>
                                <Button onClick={() => openModal('register')}>Register</Button>
                                <Button onClick={() => openModal('login')}>Login</Button>
                            </>
                    }
                </ButtonGroup>
            </Section>
            {modal === 'register' && (
                <Modal isOpen={true} onClose={closeModal} title="Register">
                    <RegistrationForm />
                </Modal>
            )}
            {modal === 'login' && (
                <Modal isOpen={true} onClose={closeModal} title="Login">
                    <LoginForm />
                </Modal>
            )}
        </Container>
    );
};
