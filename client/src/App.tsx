import React from 'react';
import { Provider } from 'react-redux';
import { AppRoutes } from './AppRoutes';
import { store } from './app/store';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
