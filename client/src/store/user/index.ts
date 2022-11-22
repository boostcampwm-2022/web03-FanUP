import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: UserStore = {
    id: null,
    nickName: null,
    accessToken: null,
    expiredDate: null,
    myStream: null,
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
    },
});

export const { testAction, login, logout, setMyStream } = userSlice.actions;
export default userSlice.reducer;
