import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyle';
import { FanUP, Home, Login, NotFound, AuthCallback, Tickets, Ticket } from './Routes';

function App() {
    console.log('github actions t esT ');
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/auth/:domain/callback" element={<AuthCallback />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/fanup/:fanUpId" element={<FanUP />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/ticket/:ticketId" element={<Ticket />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
