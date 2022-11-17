import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserStore = {
    myStream: null,
};

export const userSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setMyStream(state, action: PayloadAction<MediaStream>) {
            state.myStream = action.payload;
        },
    },
});

export const { setMyStream } = userSlice.actions;
export default userSlice.reducer;
