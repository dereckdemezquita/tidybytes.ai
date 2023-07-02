I want you to review some code for me. See if you can find any mistakes or inconsistencies. Especially pay attention to how I handled authentication as I believe I did not do it correctly. I want authentication to be stored in the client's local storage.

Suggest improvements and ways to optimise the code. Then provide the revised code.

Reminder this code base is using TypeScript, Blueprint, and Redux.

I will give you the code in two parts; here is part 1:

```tsx
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

---
// AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './routes/LandingPage';
import { Dashboard } from './routes/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                {/* add more routes as needed */}
            </Routes>
        </Router>
    );
};
---
import React from 'react';
// import { Button } from '../components/base/Button';
import { Button } from '@blueprintjs/core';
import { Modal } from '../components/base/Modal';
import { LoginForm, RegistrationForm } from '../components/base/AuthForms';
import { useModal } from '../hooks/useModal';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as helpers from '../modules/helpers';


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
    const isLoggedIn = helpers.isUserLoggedIn();
    console.log(`isLoggedIn: ${isLoggedIn}`);
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
                    {isLoggedIn ? 
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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(unsetUserData()); // Clear user data from state
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/'); // Redirect to landing page
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
                        <Button className="bp3-minimal" icon="user" text="User" />
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
---
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../modules/helpers';

interface ProtectedRouteProps {
    children: React.ReactElement;  // Note that ReactNode includes 'undefined' which isn't a valid JSX element. Here, we use ReactElement instead.
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const token = isUserLoggedIn();

    return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
```
---
You're right I want you to help me improve the code by helping to revise it.

1. For the landing page:
    1. I want you to check the local storage for a JWT token (consider writing a helper function for checking this) and see if the user is logged in; if they are logged in then display a single green button that says "Go to Dashboard" and when clicked it will take them to the dashboard page.
2. Remove authentication state from redux state. Instead, store it in local storage.
3. For the dashboard protect this route with the ProtectedRoute componenet, if the user is not logged in then redirect them to the landing page after 1 second.

Reminder this code base is using TypeScript, Blueprint, and Redux.

Paste v1 of code here:

---

Here is part 2; reminder:

I want you to review some code for me. See if you can find any mistakes or inconsistencies. Especially pay attention to how I handled authentication as I believe I did not do it correctly. I want authentication to be stored in the client's local storage (not in Redux).

Suggest improvements and ways to optimise the code. Then provide the revised code.

Reminder this code base is using TypeScript, Blueprint, and Redux.

```tsx
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
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    loggedIn: boolean;
    username?: string;
}

const initialState: UserState = {
    loggedIn: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.loggedIn = true;
            state.username = action.payload;
        },
        logout: state => {
            state.loggedIn = false;
            state.username = undefined;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
import { useState } from 'react';

type Modal = 'register' | 'login' | null;

export const useModal = () => {
    const [modal, setModal] = useState<Modal>(null);

    const openModal = (modal: Modal) => setModal(modal);
    const closeModal = () => setModal(null);

    return { modal, openModal, closeModal };
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

export const UNSET_USER_DATA = 'UNSET_USER_DATA';

export const unsetUserData = () => ({
    type: UNSET_USER_DATA,
});
import { SET_USER_DATA, UNSET_USER_DATA } from './actions';

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
        case UNSET_USER_DATA:
            return {
                ...state,
                user: null
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
```