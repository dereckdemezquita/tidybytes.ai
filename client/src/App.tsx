// client/src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './Dashboard';  // import Dashboard component
import Modal from './components/Modal';
import GlobalStyle from './GlobalStyles';

const App: React.FC = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    useEffect(() => {
        fetch('/api/test')
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <LandingPage 
                            setShowLoginForm={setShowLoginForm}
                            setShowRegisterForm={setShowRegisterForm}
                        />
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            {showLoginForm && 
                <Modal onClose={() => setShowLoginForm(false)}>
                    <Login onClose={() => setShowLoginForm(false)} />
                </Modal>
            }
            {showRegisterForm && 
                <Modal onClose={() => setShowRegisterForm(false)}>
                    <Register onClose={() => setShowRegisterForm(false)} />
                </Modal>
            }
        </Router>
    );
};

export default App;
