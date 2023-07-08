import styled from 'styled-components';

const AppTabularContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const AppTabular = () => {
    return (
        <AppTabularContainer>
            {/* Render the three app components here */}
        </AppTabularContainer>
    );
}

export default AppTabular;