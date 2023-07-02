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