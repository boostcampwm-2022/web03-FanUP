import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './_baseQuery';
import { IFanUpRooms } from '@/types/fanUp';

export const fanupApi = createApi({
    reducerPath: 'fanupApi',
    baseQuery: customFetchBaseQuery,
    //tagTypes: ['Artist'],
    endpoints: (build) => ({
        getFanUpRooms: build.query<{ data: IFanUpRooms[] }, void>({
            query: () => '/core/fanup',
        }),
    }),
});

export const { useGetFanUpRoomsQuery } = fanupApi;
