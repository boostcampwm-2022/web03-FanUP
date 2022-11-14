import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            App
        </ThemeProvider>
    );
}

export default App;
