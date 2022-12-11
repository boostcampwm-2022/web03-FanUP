import 'whatwg-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './_baseQuery';

interface IsubmitProfileImageReqData {
    userId: number;
    formData: FormData;
}

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (build) => ({
        submitProfileImage: build.mutation({
            query: ({ userId, formData }: IsubmitProfileImageReqData) => ({
                url: `/core/file/single?userId=${userId}`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useSubmitProfileImageMutation } = fileApi;
