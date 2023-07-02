import { Alignment, Navbar, NavbarGroup, NavbarHeading, Alert, Popover, Menu, MenuItem, Position, Button } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';

import { unsetUserData } from '../redux/actions';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 250px;
    background: ${({ theme }) => theme.colors.primary};
`;

const MainPanel = styled.div`
    flex-grow: 2;
    padding: ${({ theme }) => theme.spacing.medium};
    background: ${({ theme }) => theme.colors.secondary};
`;

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(unsetUserData()); // Clear user data from state
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/'); // Redirect to landing page
    }

    const userMenu = (
        <Menu>
            <MenuItem text="Settings" onClick={() => navigate('/settings')} />
            <MenuItem text="Log out" onClick={handleLogout} />
        </Menu>
    );

    return (
        <DashboardContainer>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>TidyBytes.io</NavbarHeading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Popover content={userMenu} position={Position.BOTTOM_RIGHT}>
                        <Button className="bp3-minimal" icon="user" text="User" />
                    </Popover>
                </NavbarGroup>
            </Navbar>
            <MainPanel>
                {/* Main app content goes here */}
            </MainPanel>
            <Sidebar>
                {/* Sidebar content goes here */}
            </Sidebar>
        </DashboardContainer>
    );
};