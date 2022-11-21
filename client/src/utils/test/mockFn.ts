import * as ReactRouter from 'react-router';

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
};
