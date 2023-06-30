import React from 'react';
import { PageContainer, Section, Title, SubTitle, Description, Button } from '../components/StyledComponents'

interface LandingPageProps {
    setShowLoginForm: (show: boolean) => void;
    setShowRegisterForm: (show: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setShowLoginForm, setShowRegisterForm }) => {
    return (
        <PageContainer>
            <Section>
                <Title>TidyBytes.ai</Title>

                <SubTitle color="#343a40" weight="bold">Data cleansing made easy!</SubTitle>
                <Description>
                    A data cleansing suite of tools to easily clean up, smarten, and enchance data using machine learning.
                </Description>
            </Section>
            <Section>
                <Button color="#007bff" onClick={() => setShowRegisterForm(true)}>
                    Create an Account
                </Button>
                <Button color="#007bff" onClick={() => setShowLoginForm(true)}>
                    Log In
                </Button>
            </Section>
        </PageContainer>
    );
};

export default LandingPage;