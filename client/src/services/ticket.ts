import 'whatwg-fetch';
import { SERVER_URL } from '@utils/serverUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ticket } from '@/types/ticket';
export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['Ticket'],
    endpoints: (build) => ({
        getTodayTicket: build.query<Ticket[], void>({
            query: () => '/ticket/today',
            providesTags: ['Ticket'],
        }),
    }),
});

export const { useGetTodayTicketQuery } = ticketApi;
