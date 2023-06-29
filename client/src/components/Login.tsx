// client/src/Login.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useHistory from react-router-dom
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    width: 300px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useHistory

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send a POST request to the server
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Save the token to local storage (or session storage)
            localStorage.setItem('token', data.token);
            console.log('Login successful');
            onClose();  // Close the modal
            navigate('/dashboard'); // Redirect to the dashboard
        } else {
            console.log('Error:', data.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                required 
            />
            <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                required 
            />
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default Login;
