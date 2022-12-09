import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/types/user';
import { IAritst } from '@/types/artist';
import { MyTicket } from '@/types/ticket';
import { customFetchBaseQuery } from './_baseQuery';

interface ArtistID {
    artist_id: number;
}

interface ILoginReqData {
    provider: string;
    accessToken: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['User', 'SubScribedArtist', 'MyTicket'],
    endpoints: (build) => ({
        getUser: build.query<IUser, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        submitAccessToken: build.mutation({
            query: (reqData: ILoginReqData) => ({
                url: '/auth/login',
                method: 'POST',
                body: reqData,
            }),
            invalidatesTags: ['User'],
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
    useSubmitAccessTokenMutation,
} = userApi;

export const { resetApiState: resetUserService } = userApi.util;
