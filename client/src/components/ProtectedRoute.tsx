import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;