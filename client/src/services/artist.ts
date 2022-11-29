import 'whatwg-fetch';
import { SERVER_URL } from '@/utils/serverUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAritst } from '@/types/artist';
export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['Artist'],
    endpoints: (build) => ({
        getArtist: build.query<IAritst[], void>({
            query: () => '/artist',
            providesTags: ['Artist'],
        }),
    }),
});

export const { useGetArtistQuery } = artistApi;
