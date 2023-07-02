Yes let's do that let's protect the dashboard with a JWT and nest it in a ProtectedRoute  component.

Let's save the JWT to the client's local storage in a standard way. Let's make this simple.

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { Button, FormGroup, InputGroup, Intent, Callout } from "@blueprintjs/core";
import axios, { AxiosResponse } from 'axios';
import { BaseForm } from './BaseForm';

import { setUserData } from '../../redux/actions';

interface LoginUser {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [user, setUser] = useState<LoginUser>({ email: "", password: "" });
    const [formError, setFormError] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const key = id.split('-')[0];

        setUser(prevUser => ({
            ...prevUser,
            [key]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            console.log("Attempting login...");
            const response: AxiosResponse = await axios.post('/api/login', user);
            console.log("Login successful, received response:", response);

            if (response.data && response.data.user) {
                dispatch(setUserData(response.data.user));
            }

            navigate('/dashboard');
        } catch (error: any) {
            console.error("Login failed:", error);
            if (axios.isAxiosError(error) && error.response) {
                setFormError(error.response.data.message);
            }
        }
    }

    return (
        <BaseForm onSubmit={handleSubmit}>
            {formError && (
                <Callout intent={Intent.DANGER}>
                    {formError}
                </Callout>
            )}
            <FormGroup
                label="Email"
                labelFor="email-input">
                <InputGroup id="email-input" placeholder="Email" value={user.email} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup
                label="Password"
                labelFor="password-input">
                <InputGroup id="password-input" placeholder="Password" type="password" value={user.password} onChange={handleInputChange} required />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </BaseForm>
    );
}

interface RegisterUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const RegistrationForm = () => {
    const [user, setUser] = useState<RegisterUser>({ username: "", password: "", email: "", firstName: "", lastName: "" });
    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [formError, setFormError] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const key = id.split('-')[0];

        setUser(prevUser => ({
            ...prevUser,
            [key]: value,
        }));
    };


    const checkUsernameAvailability = async () => {
        try {
            const response: AxiosResponse = await axios.get('/api/validate_register_username', { params: { username: user.username } });
            setUsernameError("");
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                setUsernameError(error.response.data.message);
            }
        }
    }

    const checkEmailAvailability = async () => {
        try {
            const response: AxiosResponse = await axios.get('/api/validate_register_email', { params: { email: user.email } });
            setEmailError("");
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                setEmailError(error.response.data.message);
            }
        }
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const { id } = event.target;
        if (id === 'username-input') {
            checkUsernameAvailability();
        } else if (id === 'email-input') {
            checkEmailAvailability();
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response: AxiosResponse = await axios.post('/api/register', user);
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                setFormError(error.response.data.message);
            }
        }
    }

    return (
        <BaseForm onSubmit={handleSubmit}>
            <FormGroup
                label="First Name"
                labelFor="first-name-input">
                <InputGroup id="first-name-input" placeholder="First Name" value={user.firstName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup
                label="Last Name"
                labelFor="last-name-input">
                <InputGroup id="last-name-input" placeholder="Last Name" value={user.lastName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup
                label="Email"
                labelFor="email-input"
                intent={emailError ? Intent.DANGER : Intent.NONE}
                helperText={emailError}>
                <InputGroup id="email-input" placeholder="Email" value={user.email} onChange={handleInputChange} onBlur={handleBlur} required />
            </FormGroup>
            <FormGroup
                label="Username"
                labelFor="username-input"
                intent={usernameError ? Intent.DANGER : Intent.NONE}
                helperText={usernameError}>
                <InputGroup id="username-input" placeholder="Username" value={user.username} onChange={handleInputChange} onBlur={handleBlur} required />
            </FormGroup>
            <FormGroup
                label="Password"
                labelFor="password-input">
                <InputGroup id="password-input" placeholder="Password" type="password" value={user.password} onChange={handleInputChange} required />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </BaseForm>
    );
}

import { Alignment, Navbar, NavbarGroup, NavbarHeading, Alert, Popover, Menu, MenuItem, Position, Button } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';

import { unsetUserData } from '../redux/actions';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 250px;
    background: ${({ theme }) => theme.colors.primary};
`;

const MainPanel = styled.div`
    flex-grow: 2;
    padding: ${({ theme }) => theme.spacing.medium};
    background: ${({ theme }) => theme.colors.secondary};
`;

export const Dashboard = () => {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false);

    if (!user) {
        setShowAlert(true);
        setTimeout(() => navigate('/'), 2000);
        return (
            <Alert isOpen={showAlert} onClose={() => setShowAlert(false)}>
                <p>You are not logged in. You will be redirected to the landing page.</p>
            </Alert>
        );
    }

    const handleLogout = () => {
        dispatch(unsetUserData());
        navigate('/');
    }

    const userMenu = (
        <Menu>
            <MenuItem text="Settings" onClick={() => navigate('/settings')} />
            <MenuItem text="Log out" onClick={handleLogout} />
        </Menu>
    );

    return (
        <DashboardContainer>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>TidyBytes.io</NavbarHeading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Popover content={userMenu} position={Position.BOTTOM_RIGHT}>
                        <Button className="bp3-minimal" icon="user" text={user.name} />
                    </Popover>
                </NavbarGroup>
            </Navbar>
            <MainPanel>
                {/* Main app content goes here */}
            </MainPanel>
            <Sidebar>
                {/* Sidebar content goes here */}
            </Sidebar>
        </DashboardContainer>
    );
};

import React from 'react';
import { Button } from '@blueprintjs/core';
import { Modal } from '../components/base/Modal';
import { LoginForm, RegistrationForm } from '../components/base/AuthForms';
import { useModal } from '../hooks/useModal';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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
    const { modal, openModal, closeModal } = useModal();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();

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
                    <Button onClick={() => user ? navigate('/dashboard') : openModal('register')}>Register</Button>
                    <Button intent={user ? "success" : "none"} onClick={() => user ? navigate('/dashboard') : openModal('login')}>Login</Button>
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

import React from 'react';
import { Provider } from 'react-redux';
import { AppRoutes } from './AppRoutes';
import { store } from './app/store';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './routes/LandingPage';
import { Dashboard } from './routes/Dashboard';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* add more routes as needed */}
            </Routes>
        </Router>
    );
};

---

// server side code
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
});

const User = mongoose.model('user', userSchema, 'users');

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '2h' },
        );

        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;