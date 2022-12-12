import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IAritst } from '@/types/artist';
import { customFetchBaseQuery } from './_baseQuery';
import { useGetUserQuery } from './user.service';

interface IsubmitArtistInfoReqData {
    name: string;
    profileUrl: string;
}

const getArtistURL = `/auth/artist${
    localStorage.getItem('userId') ? `?userId=${localStorage.getItem('userId')}` : ''
}`;

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['Artists'],
    endpoints: (build) => ({
        getAllArtists: build.query<IAritst[], number | undefined>({
            //TODO : invalidate when 00:00
            query: (userId?: number) => `/auth/artist${userId ? `?userId=${userId}` : ''}`,
            providesTags: ['Artists'],
        }),
        submitArtistInfo: build.mutation({
            query: (reqData: IsubmitArtistInfoReqData) => ({
                url: '/auth/artist',
                method: 'POST',
                body: reqData,
            }),
        }),
    }),
});

export const useGetAllArtistsQuery = () => {
    const { data: userData } = useGetUserQuery();
    return artistApi.useGetAllArtistsQuery(userData?.id);
};

export const { useSubmitArtistInfoMutation } = artistApi;
export const { resetApiState: resetArtistService } = artistApi.util;
