import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const 전체 = 0;

export const initialState: UserStore = {
    myStream: null,
    artistListViewMode: 전체,
};

export const userSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setMyStream(state, action: PayloadAction<MediaStream>) {
            state.myStream = action.payload;
        },
        initializeMyStream(state) {
            state.myStream = null;
        },
        setArtistListViewMode(state, action: PayloadAction<number>) {
            state.artistListViewMode = action.payload;
        },
    },
});

export const { setMyStream, initializeMyStream, setArtistListViewMode } = userSlice.actions;
export default userSlice.reducer;
