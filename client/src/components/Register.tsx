// client/src/components/Register.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import ErrorModal from './ErrorModal';  // Add this line

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

const ErrorMessage = styled.p`
    color: #ff0000;
    text-align: center;
    margin-top: 10px;
    font-size: 1em;
    font-weight: bold;
`;

const Register: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // Add this line
    const [lastName, setLastName] = useState(''); // Add this line
    const [username, setUsername] = useState(''); // Add this line
    const [error, setError] = useState('');  // Add this line

    const checkEmail = async () => {
        if (email) {
            const response = await fetch(`/api/checkEmail?email=${email}`);
            const data = await response.json();
            if (!data.success) {
                setError(data.message);
            }
        }
    };

    const checkUsername = async () => {
        if (username) {
            const response = await fetch(`/api/checkUsername?username=${username}`);
            const data = await response.json();
            if (!data.success) {
                setError(data.message);
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');  // Update this line
            return;
        }

        // Send a POST request to the server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, firstName, lastName, username }), // Modify this line
        });

        const data = await response.json();

        if (data.success) {
            console.log('Registration successful');
            onClose();  // Close the modal
        } else {
            setError(data.message);  // Update this line
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} 
                    required 
                />
                <Input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} 
                    required 
                />
                <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        setError('');
                    }} 
                    onBlur={checkEmail}
                    required 
                />
                <Input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                        setError('');
                    }} 
                    onBlur={checkUsername}
                    required 
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    required 
                />
                <Input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <Button type="submit">Register</Button>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};

export default Register;