import styled from 'styled-components';

export const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
`;

export const Title = styled.h1`
    color: #343a40;
    font-size: 3em;
    text-align: center;

    &:after {
        content: '';
        display: block;
        width: 100px;
        height: 5px;
        background-color: #007bff;
        margin: 10px auto;
    }
`;

export const SubTitle = styled.h2<{ color: string, weight: string }>`
    color: ${props => props.color};
    font-size: 2em;
    font-weight: ${props => props.weight};
    text-align: center;
`;

export const Description = styled.section`
    color: #6c757d;
    font-size: 1.2em;
    text-align: center;
    max-width: 650px;
    margin-top: 20px;
`;

export const Section = styled.section<{ backgroundColor?: string }>`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Button = styled.button<{ color: string }>`
    background-color: ${props => props.color};
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.color === '#007bff' ? '#0056b3' : '#6c757d'};
    }
`;