import { SERVER_URL } from '@/utils/serverUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['Artist'],
    endpoints: (build) => ({
        getArtist: build.query({
            query: () => '/artist',
            providesTags: ['Artist'],
        }),
    }),
});

export const { useGetArtistQuery } = artistApi;
