// client/src/GlobalStyles.tsx

import { createGlobalStyle } from 'styled-components';
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
        background-color: #f6f7fb;
        color: #333;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        color: #444;
    }

    a {
        color: #007bff;
        text-decoration: none;
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
