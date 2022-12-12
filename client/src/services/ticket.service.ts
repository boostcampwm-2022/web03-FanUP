import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TicketSales, TicketDetail, TicketSubmitData } from '@/types/ticket';
import { customFetchBaseQuery } from './_baseQuery';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: customFetchBaseQuery,
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
        getUserTickets: build.query<any[], void>({
            query: () => '/ticket/user',
            providesTags: ['MyTicket'],
        }),
        submitTicket: build.mutation({
            query: (reqData: TicketSubmitData) => ({
                url: `/ticket`,
                method: 'POST',
                body: reqData,
            }),
            invalidatesTags: ['TodayTicket', 'Ticket'],
        }),
        ticketing: build.mutation({
            query: (ticketId: string) => {
                return {
                    url: '/ticket/user',
                    method: 'POST',
                    body: { ticketId },
                };
            },
            invalidatesTags: (result, error, ticketId) => {
                if (result?.status === 403) return [];
                else return ['MyTicket'];
            },
        }),
    }),
});

export const {
    useGetTodayTicketsQuery,
    useGetAllTicketsQuery,
    useGetUserTicketsQuery,
    useGetDetailTicketQuery,
    useSubmitTicketMutation,
    useTicketingMutation,
} = ticketApi;
