import reducer, {
    setMyStream,
    initialState,
    initializeMyStream,
    setArtistListViewMode,
} from '@/store/user';
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
    it('initializeMyStream', () => {
        const state = reducer(initialState, initializeMyStream());
        expect(state.myStream).toBe(null);
    });
    it('setArtistListViewMode', () => {
        const state = reducer(initialState, setArtistListViewMode(1));
        expect(state.artistListViewMode).toBe(1);
    });
});
