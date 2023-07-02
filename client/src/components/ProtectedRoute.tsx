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

    // If there is no token (i.e., user is not authenticated), navigate to the landing page ('/')
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    // If user is authenticated (i.e., there is a token), render the protected components (children)
    // If not, redirect them to the landing page, keeping note of the current location they were trying to access
    return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;