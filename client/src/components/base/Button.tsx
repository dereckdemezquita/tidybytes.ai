import React from 'react';
import { Button as BPButton, ButtonProps } from '@blueprintjs/core';
import styled from 'styled-components';

interface Props extends ButtonProps { }

const StyledButton = styled(BPButton)`
    margin: 10px 0.5rem;
    padding: 10px 1rem;
    background-color: ${({ theme }) => theme.colors.buttonPrimary};
    color: ${({ theme }) => theme.colors.buttonSecondary};
`;

export const Button: React.FC<Props> = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};
