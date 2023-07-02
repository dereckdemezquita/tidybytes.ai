Review the code I have for the registration form, now I want you to develop and better the code for the LoginForm. Remember this we are supposed to be using Blueprint, try to use Blueprint's features.


```typescript
import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import axios, { AxiosResponse } from 'axios';
import { BaseForm } from './BaseForm';

interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const LoginForm = () => {
    return (
        <BaseForm>
            <FormGroup
                label="Username"
                labelFor="username-input">
                <InputGroup id="username-input" placeholder="Username" required />
            </FormGroup>
            <FormGroup
                label="Password"
                labelFor="password-input">
                <InputGroup id="password-input" placeholder="Password" type="password" required />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </BaseForm>
    );
}

export const RegistrationForm = () => {
    const [user, setUser] = useState<User>({ username: "", password: "", email: "", firstName: "", lastName: "" });
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

```

Here is the auth endpoints:

```typescript
// server/src/auth.ts

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

router.get('/api/validate_register_email', async (req, res) => {
    const { email } = req.query;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/api/validate_register_username', async (req, res) => {
    const { username } = req.query;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already in use' });
        }
        return res.status(200).json({ success: true });
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

export default router;
```