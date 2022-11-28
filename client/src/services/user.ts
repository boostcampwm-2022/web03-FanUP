import 'whatwg-fetch';
import { SERVER_URL } from '@/utils/serverUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/types/user';
import { IAritst } from '@/types/artist';
import { MyTicket } from '@/types/ticket';

interface ArtistID {
    artist_id: number;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['User', 'SubScribedArtist', 'MyTicket'],
    endpoints: (build) => ({
        getUser: build.query<IUser, void>({
            query: () => '/user',
            providesTags: ['User'],
        }),
        getSubScribedArtist: build.query<IAritst[], void>({
            query: () => '/user/artist',
            providesTags: ['SubScribedArtist'],
        }),
        subscribeArtist: build.mutation({
            query: (reqData: ArtistID) => ({
                url: '/user/artist',
                method: 'POST',
                body: reqData,
            }),
            invalidatesTags: ['SubScribedArtist'],
        }),
        unSubscribeArtist: build.mutation({
            query: (reqData: ArtistID) => ({
                url: '/user/artist',
                method: 'PATCH',
                body: reqData,
            }),
            invalidatesTags: ['SubScribedArtist'],
        }),
        getMyTickets: build.query<MyTicket[], void>({
            query: () => '/ticket/my',
            providesTags: ['MyTicket'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetSubScribedArtistQuery,
    useSubscribeArtistMutation,
    useUnSubscribeArtistMutation,
    useGetMyTicketsQuery,
} = userApi;