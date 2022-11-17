import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserStore = {
    id: null,
    nickName: null,
    accessToken: null,
    expiredDate: null,
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
    },
});

export const { testAction, login, logout } = userSlice.actions;
export default userSlice.reducer;
