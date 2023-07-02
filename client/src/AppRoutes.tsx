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