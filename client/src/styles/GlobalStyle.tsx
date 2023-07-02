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
        color: #444;
    }

    a {
        color: #007bff;

    }

    a:hover {
        color: #0056b3;
    }

    .container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
