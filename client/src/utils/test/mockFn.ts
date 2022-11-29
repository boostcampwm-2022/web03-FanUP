import * as ReactRouter from 'react-router';
import * as ReactRouterDom from 'react-router-dom';
import * as React from 'react';

export const MOCK_FN = {
    getUserMedia: () => {
        const mockGetUserMedia = jest.fn(async () => {
            return new Promise<void>((resolve) => {
                resolve();
            });
        });

        Object.defineProperty(global.navigator, 'mediaDevices', {
            value: {
                getUserMedia: mockGetUserMedia,
            },
        });
    },
    useParams: (params: any) => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue(params);
    },
    useNaviagte: (navigate: any) => {
        jest.spyOn(ReactRouter, 'useNavigate').mockReturnValue(navigate);
    },
    memo: (memoFn: any) => {
        jest.spyOn(React, 'memo').mockReturnValue(memoFn);
    },
    intersectionObserver: () => {
        const intersectionObserverMock = () => ({
            observe: () => null,
        });
        window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
    },
};
