import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import { FanUP, Home } from './Routes';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/FanUP/:fanUpId" element={<FanUP />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
