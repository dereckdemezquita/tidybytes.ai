import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface NavBarProps {
    userEmail: string;
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    color: #fff;
    padding: 20px;
`;

const Logo = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`;

const UserEmail = styled.div`
    font-size: 1.2em;
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    &:hover {
        color: #ddd;
    }
`;

const NavBar: React.FC<NavBarProps> = ({ userEmail }) => {
    return (
        <Nav>
            <Logo>Logo</Logo>
            <UserEmail>{userEmail}</UserEmail>
            <StyledLink to="/settings">Settings</StyledLink>
        </Nav>
    );
};

export default NavBar;
