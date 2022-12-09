import React, { lazy } from 'react';

export const Home = lazy(() => import('@pages/Home'));
export const FanUP = lazy(() => import('@pages/FanUP'));
export const Login = lazy(() => import('@pages/Login'));
export const AuthCallback = lazy(() => import('@pages/AuthCallback'));
export const Tickets = lazy(() => import('@pages/Tickets'));
export const Ticket = lazy(() => import('@pages/Ticket'));
export const NotFound = lazy(() => import('@pages/404'));
export const TicketingSuccess = lazy(() => import('@pages/Ticketing/Success'));
export const TicketingFailure = lazy(() => import('@pages/Ticketing/Failure'));
export const Schedule = lazy(() => import('@pages/Schedule'));
