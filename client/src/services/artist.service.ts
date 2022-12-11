import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IAritst } from '@/types/artist';
import { customFetchBaseQuery } from './_baseQuery';

interface IsubmitArtistInfoReqData {
    name: string;
    profileUrl: string;
}

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['Artists'],
    endpoints: (build) => ({
        getAllArtists: build.query<IAritst[], void>({
            //TODO : invalidate when 00:00
            query: () => '/auth/artist',
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

export const { useGetAllArtistsQuery, useSubmitArtistInfoMutation } = artistApi;
