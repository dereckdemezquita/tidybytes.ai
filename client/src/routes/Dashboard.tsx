import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import DataPreview from './DataPreview';
import { fetchUserData } from '../modules/api';

const DashboardLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    overflow: auto;
`;

interface UserData {
    email: string;
}

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserData()
            .then(user => {
                setUserData(user);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Add a proper loading UI here.
    }

    if (error) {
        return <p>Error: {error}</p>; // Handle the error gracefully in UI.
    }

    return (
        <DashboardLayout>
            <NavBar userEmail={userData ? userData.email : ""} />
            <Content>
                <Sidebar />
                <DataPreview />
            </Content>
        </DashboardLayout>
    );
};

export default Dashboard;
