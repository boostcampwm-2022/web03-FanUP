import { FanUpStore } from '@/types/fanUp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PARTICIPANTS_MODE = 0;

const initialState: FanUpStore = {
    mode: PARTICIPANTS_MODE,
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
