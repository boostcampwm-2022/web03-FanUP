import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).userSlice.token || localStorage.getItem('token') || null;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});
