import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../modules/helpers';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [authStatus, setAuthStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isLoggedIn = await isUserLoggedIn();
            if (!isLoggedIn) {
                navigate("/");
            } else {
                setAuthStatus(isLoggedIn);
            }
        };
        checkAuth();
    }, [navigate]);

    if (authStatus === null) {
        return null;
    }

    return authStatus ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;