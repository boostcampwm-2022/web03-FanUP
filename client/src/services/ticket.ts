import 'whatwg-fetch';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TicketSales, TicketDetail, TicketSubmitData } from '@/types/ticket';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
    tagTypes: ['Ticket', 'MyTicket', 'TodayTicket', 'TicketDetail'],
    endpoints: (build) => ({
        getTodayTickets: build.query<TicketSales[], void>({
            //TODO : invalidate when 00:00
            query: () => '/ticket/today',
            providesTags: ['TodayTicket'],
        }),
        getAllTickets: build.query<TicketSales[], void>({
            query: () => '/ticket',
            providesTags: ['Ticket'],
        }),
        getDetailTicket: build.query<TicketDetail, string>({
            query: (ticketid: string) => ({ url: `/ticket/${ticketid}` }),
            providesTags: (result, error, id) => [{ type: 'TicketDetail', id }],
        }),
        submitTicket: build.mutation({
            query: (reqData: TicketSubmitData) => ({
                url: `/ticket`,
                method: 'POST',
                body: reqData,
            }),
            invalidatesTags: ['TodayTicket', 'Ticket'],
        }),
    }),
});

export const {
    useGetTodayTicketsQuery,
    useGetAllTicketsQuery,
    useGetDetailTicketQuery,
    useSubmitTicketMutation,
} = ticketApi;
