I don't understand anything about react, please instruct me on all of this.

1. I want to be able to create a helper function that checks if there is a JWT in local storage. It then sends it to the server to check if it's valid. It returns true/false based on if the token is valid.
2. I want to create a ProtectedRoute component that will allow me to use it with certain routes for the app, I want the ProtectedRoute to use the helper function to check if a user has a valid JWT. If they have a valid JWT they are allowed in the ProtectedRoute, if not they are redirected to the dashboard "/".

Here is the code I currenlty have, please revise it as you see fit to accomplish the above goals.

```tsx
import axios from 'axios';

export const isUserLoggedIn = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const response = await axios.get('/api/validate_token', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        
        if (response.data.success) {
            return true;
        }

        
        localStorage.removeItem('token');
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
    }

    return false;
};
---
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const [authStatus, setAuthStatus] = useState<boolean | null>(null);  

    
    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            axios.get('/api/validate_token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setAuthStatus(response.data.success);
            })
            .catch(error => {
                console.log(error);
                setAuthStatus(false);
            });
        }
    }, [token, navigate]);

    
    if (authStatus === null) {
        return null;
    }

    return authStatus ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
---
import React, { useEffect, useState } from 'react';
import { Button } from '@blueprintjs/core';
import { Modal } from '../components/base/Modal';
import { LoginForm, RegistrationForm } from '../components/base/AuthForms';
import { useAuthModal } from '../hooks/useAuthModal';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { isUserLoggedIn } from '../modules/helpers';

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
---
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

            if (response.data && response.data.success) {
                localStorage.setItem('token', response.data.token);
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
```
Server side code:
```ts
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

router.post('/api/register', async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            let message = 'Email already in use';

            if (existingUser.username === username) {
                message = 'Username already in use';
            }

            return res.status(400).json({ success: false, message });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
        });

        const savedUser = await user.save();

        const token = jwt.sign(
            { _id: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: '2h' },
        );

        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/api/validate_token', authenticateJWT, async (req: express.Request, res) => {
    
    return res.status(200).json({ success: true });
});

export default router;

function authenticateJWT(req: express.Request, res, next: express.NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decodedToken;  

    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    next();  
}
```