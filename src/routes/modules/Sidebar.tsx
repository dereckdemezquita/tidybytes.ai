import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 250px;
    background: #E9ECEF;
`;

export default ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarContainer>
            {children}
        </SidebarContainer>
    );
}