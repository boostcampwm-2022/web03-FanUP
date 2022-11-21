import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: UserStore = {
    myStream: null,
};

export const userSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setMyStream(state, action: PayloadAction<MediaStream>) {
            state.myStream = action.payload;
        },
        initalizeMyStream(state) {
            state.myStream = null;
        },
    },
});

export const { setMyStream, initalizeMyStream } = userSlice.actions;
export default userSlice.reducer;
