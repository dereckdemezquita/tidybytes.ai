// client/src/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import DataPreview from './components/DataPreview';

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // Assume you have an endpoint to fetch user data which needs an Authorization header
            const response = await fetch('/api/userData', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                console.log('Error:', response.statusText);
                return;
            }

            const data = await response.json();

            if (data.success) {
                setUserData(data.user);
            } else {
                console.error('Error:', data.message);
            }
        }

        fetchData();
    }, []);

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
