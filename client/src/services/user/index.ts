import { SERVER_URL } from '@/utils/serverUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => '/user',
            providesTags: ['User'],
        }),
    }),
});

export const { useGetUserQuery } = userApi;
