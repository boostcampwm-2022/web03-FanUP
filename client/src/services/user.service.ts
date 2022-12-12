import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/types/user';
import { IAritst } from '@/types/artist';
import { MyTicket } from '@/types/ticket';
import { customFetchBaseQuery } from './_baseQuery';
import { InitializeLocalStorage } from '@/utils/initializeLocalStorage';

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
        editNickname: build.mutation({
            query: (nickname: string) => ({
                url: '/auth/user',
                method: 'PATCH',
                body: { nickname },
            }),
            invalidatesTags: ['User'],
        }),
        getSubScribedArtist: build.query<IAritst[], void>({
            query: () => '/auth/artist/favorite',
            providesTags: ['SubScribedArtist'],
        }),
        subscribeArtist: build.mutation({
            query: (artistId: number) => ({
                url: `/auth/artist/${artistId}/favorite`,
                method: 'POST',
            }),
            invalidatesTags: ['SubScribedArtist'],
            async onQueryStarted(artistId, { dispatch, queryFulfilled }) {
                console.log('artistId : ', artistId);
                dispatch(
                    updateQueryData('getSubScribedArtist', undefined, (draft) => {
                        console.log('updateQueryData');
                        console.log('artistId : ', artistId);
                        console.log('draft : ', JSON.stringify(draft));
                    })
                );
            },
        }),
        unSubscribeArtist: build.mutation({
            query: (artistId: number) => ({
                url: `/auth/artist/${artistId}/favorite`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SubScribedArtist'],
        }),
    }),
});

export const useGetUserQuery = () => {
    const queryResult = userApi.useGetUserQuery(undefined, {
        skip: localStorage.getItem('token') ? false : true,
    });
    if (queryResult.isError) InitializeLocalStorage();
    return queryResult;
};

export const {
    useGetSubScribedArtistQuery,
    useSubscribeArtistMutation,
    useUnSubscribeArtistMutation,
    useSubmitAccessTokenMutation,
    useEditNicknameMutation,
} = userApi;

export const { resetApiState: resetUserService, updateQueryData } = userApi.util;
