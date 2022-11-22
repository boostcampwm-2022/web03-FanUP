import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyle';
import AuthCallback from '@pages/AuthCallback';
import { FanUP, Home, Login } from './Routes';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/auth/google/callback" element={<AuthCallback />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/FanUP/:fanUpId" element={<FanUP />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
