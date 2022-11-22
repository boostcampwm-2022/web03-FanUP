/**
 * @jest-environment jsdom
 */

import reducer, { setMyStream, initialState } from '@/store/user';
import { MOCK_FN } from '@/utils/test/mockFn';

describe('userSlice', () => {
    it('setMyStream', async () => {
        MOCK_FN.getUserMedia();
        const mockStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: 'user' },
        });

        const state = reducer(initialState, setMyStream(mockStream));
        expect(state.myStream).toBe(mockStream);
    });
});
