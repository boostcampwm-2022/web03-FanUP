import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyle';

import Login from '@pages/Login';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Login />
        </ThemeProvider>
    );
}

export default App;
