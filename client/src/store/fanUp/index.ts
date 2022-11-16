import { FanUpStore } from '@/types/fanUp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CHAT_MODE = 1;

const initialState: FanUpStore = {
    mode: CHAT_MODE,
};

export const fanUpSlice = createSlice({
    name: 'fanUp',
    initialState,
    reducers: {
        changeMode(state, action: PayloadAction<number>) {
            state.mode = action.payload;
        },
    },
});

export const { changeMode } = fanUpSlice.actions;
export default fanUpSlice.reducer;
