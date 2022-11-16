import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserStore = {
    name: '',
};

export const userSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        testAction(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name;
        },
    },
});

export const { testAction } = userSlice.actions;
export default userSlice.reducer;
