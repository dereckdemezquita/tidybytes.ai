// Sidebar.tsx

import React from 'react';
import styled from 'styled-components';
import FileUpload from './FileUpload'; // Import the FileUpload component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Aside = styled.aside`
    position: relative;
    width: 250px;
    height: 95vh;
    background-color: #f0f0f0;
    padding: 20px;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: #d0d0d0;
    text-align: center;
`;

const Sidebar: React.FC = () => {
    return (
        <Aside>
            <Section>
                <FileUpload uploadEndPoint="/api/upload" acceptedFileTypes={['csv', 'xlsx']} />
            </Section>
            <Footer>
                <p>
                    Big data? Use our <Link to="/settings/api">API</Link>!
                </p>
                <Link to="/privacy">Data Policy</Link>
            </Footer>
        </Aside>
    );
};

export default Sidebar;
