import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TicketSales, TicketDetail, TicketSubmitData, MyTicket } from '@/types/ticket';
import { customFetchBaseQuery } from './_baseQuery';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['Ticket', 'MyTicket', 'TodayTicket', 'TicketDetail', 'ArtistTicket'],
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
        getUserTickets: build.query<MyTicket[], void>({
            query: () => '/ticket/user',
            providesTags: ['MyTicket'],
        }),
        getArtistTodayTicket: build.query<MyTicket[], void>({
            query: () => '/ticket/artist/today',
            providesTags: ['ArtistTicket'],
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
    useGetArtistTodayTicketQuery,
    useGetTodayTicketsQuery,
    useGetAllTicketsQuery,
    useGetUserTicketsQuery,
    useGetDetailTicketQuery,
    useSubmitTicketMutation,
    useTicketingMutation,
} = ticketApi;
