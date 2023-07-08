import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html, body {
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        background-color: ${theme.colors.background};
        color: #242424;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        color: ${theme.colors.primary};
    }

    a {
        color: ${theme.colors.anchor};

    }

    a:hover {
        color: ${theme.colors.anchorHover};
    }
`;

export default GlobalStyle;