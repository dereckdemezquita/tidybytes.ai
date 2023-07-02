We will work on developping the dashboard. This will be the main page of the application. As a reminder we are using TypeScript, styled-componenets, redux, Blueprint. Be aware of Blueprint and let's try to use as many Blueprint features as possible.

The dashbaord:

1. There is a navigation bar at the top of the page
    1. The navigation bar has the website name aligned to the left.
    2. Account username aligned to the right (clicking it will navigate to the user settings page)

The dashboard is capable of hosting various different apps. But the dashboard should always be made up like so:

1. The navigation bar up top.
2. The sidebar which hosts application specific selectors and settings.
3. The main panel which hosts the currently selected main application.

We will start by working on the tabular data app. This is an app for cleaning up tabular style data. Below I describe the app for working with tabular data.

As a reminder here is some of the code we currently have:

```tsx
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

export const theme = {
    colors: {
        primary: '#34495E',
        secondary: '#F5F8FA',
        error: '#DB3737',
        success: '#0F9960',
        warning: '#FFB366',
        info: '#106BA3',
        text: '#253238',
        mutedText: '#5C7080',
        background: '#FDFDFD',
        overlay: 'rgba(16, 22, 26, 0.7)',
        buttonPrimary: '#106BA3',
        buttonSecondary: '#F5F8FA',
        offWhite: '#F8F9FA',
        darkGray: '#343A40',
        accent1: '#8A2387',
        accent2: '#E94057',
        accent3: '#F27121',
        accent4: '#FBBD08',
        accent5: '#B5CC18',
    },
    fonts: {
        primary: 'Roboto, sans-serif',
        secondary: 'Arial, sans-serif',
    },
    fontSizes: {
        small: '0.8rem',
        normal: '1rem',
        medium: '1.2rem',
        large: '1.5rem',
        xlarge: '2rem',
        title: '3rem',
        subtitle: '1.5rem',
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
        light: 300,
    },
    spacing: {
        xsmall: '0.25rem',
        small: '0.5rem',
        medium: '1rem',
        large: '2rem',
        xlarge: '4rem',
    },
    breakpoints: {
        small: '480px',
        medium: '768px',
        large: '1024px',
        xlarge: '1200px',
    },
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    borderRadius: '0.25rem',
};

import React from 'react';
// import { Button } from '../components/base/Button';
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

export const SET_USER_DATA = 'SET_USER_DATA';

interface User {
    id: number;
    name: string;
    email: string;
    // add other user properties here
}

export const setUserData = (user: User) => ({
    type: SET_USER_DATA,
    payload: user
});
import { SET_USER_DATA } from './actions';

const initialState = {
    user: null
};

interface ActionType {
    type: string;
    payload?: any;
}


export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
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
        const key = id.split('-')[0]; // this will map the input's id to the correct key in our state

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
            
            if(response.data && response.data.user) {
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
        const key = id.split('-')[0]; // this will map the input's id to the correct key in our state
    
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
---
// server side
router.get('/api/dashboard/get_user_data', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assumes 'Bearer TOKEN'

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await User.findById(decodedToken._id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
```