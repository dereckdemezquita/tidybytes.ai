import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/Dashboard';

type AppRoutesProps = {
  showLoginModal: () => void;
  showRegisterModal: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ showLoginModal, showRegisterModal }) => (
    <Routes>
        <Route
            path="/"
            element={
              <LandingPage 
                setShowLoginForm={showLoginModal}
                setShowRegisterForm={showRegisterModal} 
              />
            }
        />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
);

export default AppRoutes;
