import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const 전체 = 0;

export const initialState: UserStore = {
    id: null,
    nickName: null,
    accessToken: null,
    expiredDate: null,
    myStream: null,
    artistListViewMode: 전체,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        testAction(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.id = id;
        },
        login(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.id = id;
        },
        logout(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.id = id;
        },
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

export const { testAction, login, logout, setMyStream, initializeMyStream, setArtistListViewMode } =
    userSlice.actions;

export default userSlice.reducer;
