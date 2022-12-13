import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { CalendarData, IAritst, ISchedules } from '@/types/artist';
import { customFetchBaseQuery } from './_baseQuery';
import { useGetUserQuery } from './user.service';
import { dateDiff } from '@/utils/dateDiff';
import { AnyListenerPredicate } from '@reduxjs/toolkit';

interface IsubmitArtistInfoReqData {
    name: string;
    profileUrl: string;
}

interface IIsArtist {
    roomId: string;
    artistId: number;
}

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['Artists', 'Schedules'],
    endpoints: (build) => ({
        getAllArtists: build.query<IAritst[], number | undefined>({
            //TODO : invalidate when 00:00
            query: (userId?: number) => `/auth/artist${userId ? `?userId=${userId}` : ''}`,
            providesTags: ['Artists'],
        }),
        getSchedules: build.query<any[], CalendarData>({
            query: ({ calendarMonth, calendarYear }) =>
                `/ticket/artist/calendar?year=${calendarYear}&month=${calendarMonth}`,
            providesTags: ['Schedules'],
            transformResponse: (response: any[]) => {
                const temp: any[] = Array.from({ length: 31 }, () => []);
                response?.forEach((data) => {
                    const startDate = new Date(data.startTime);
                    const date = startDate.getDate();
                    const [diff] = dateDiff(startDate, new Date());
                    temp[date].push({ data, isPast: diff < 0 ? true : false });
                });

                return temp;
            },
        }),
        getIsFanUPArtist: build.query<any, IIsArtist>({
            query: ({ artistId, roomId }: IIsArtist) =>
                `/core/isArtist?artistId=${artistId}&roomId=${roomId}`,
        }),
        submitArtistInfo: build.mutation({
            query: (reqData: IsubmitArtistInfoReqData) => ({
                url: '/auth/artist',
                method: 'POST',
                body: reqData,
            }),
        }),
        editArtistInfo: build.mutation({
            query: (reqData: IsubmitArtistInfoReqData) => ({
                url: '/auth/artist',
                method: 'PATCH',
                body: reqData,
            }),
        }),
    }),
});

export const useGetAllArtistsQuery = () => {
    const { data: userData } = useGetUserQuery();
    return artistApi.useGetAllArtistsQuery(userData?.id);
};

export const {
    useGetIsFanUPArtistQuery,
    useGetSchedulesQuery,
    useSubmitArtistInfoMutation,
    useEditArtistInfoMutation,
} = artistApi;
export const { resetApiState: resetArtistService } = artistApi.util;
