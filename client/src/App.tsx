import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyle';
import Login from '@pages/Login';
import AuthCallback from '@pages/AuthCallback';
import { FanUP, Home } from './Routes';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/google/callback" element={<AuthCallback />} />
                <Route path="/" element={<Home />} />
                <Route path="/FanUP/:fanUpId" element={<FanUP />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
