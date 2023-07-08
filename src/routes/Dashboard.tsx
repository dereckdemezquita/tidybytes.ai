import { useState } from 'react';
import NavbarComponent from './modules/Navbar';
import Sidebar from './modules/Sidebar';
import AppTabular from './apps/AppTabular';
import FileManager from './apps/FileManager';
import styled from 'styled-components';

const DashboardLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    overflow: auto;
`;

const MainPanel = styled.div`
    flex-grow: 2;
    padding: ${({ theme }) => theme.spacing.medium};
    background: ${({ theme }) => theme.colors.secondary};
`;

export const Dashboard = () => {
    const [selectedApp, setSelectedApp] = useState('home');

    return (
        <DashboardLayout>
            <NavbarComponent setSelectedApp={setSelectedApp} />
            <Content>
                <Sidebar>
                    {/* Sidebar content goes here */}
                </Sidebar>
                <MainPanel>
                    {selectedApp === 'home' && <AppTabular />}
                    {selectedApp === 'files' && <FileManager />}
                    {/* Render the selected component */}
                </MainPanel>
            </Content>
        </DashboardLayout>
    );
};
