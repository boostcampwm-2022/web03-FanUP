import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyle';
import {
    FanUP,
    Home,
    Login,
    NotFound,
    AuthCallback,
    Tickets,
    Ticket,
    TicketingSuccess,
    TicketingFailure,
} from './Routes';

function App() {
    console.log('github actions test!!!');
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
                    <Route path="/ticketing/success" element={<TicketingSuccess />} />
                    <Route path="/ticketing/failure" element={<TicketingFailure />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
