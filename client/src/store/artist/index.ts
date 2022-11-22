import { ArtistStore } from '@/types/artist';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ArtistStore = {
    calendarYear: new Date().getFullYear(),
    calendarMonth: new Date().getMonth() + 1,
    openSchduleModal: false,
    selectedDay: null,
};

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setYear(state, action: PayloadAction<number>) {
            state.calendarYear = action.payload;
        },
        setMonth(state, action: PayloadAction<number>) {
            state.calendarMonth = action.payload;
        },
        openScheduleModal(state) {
            state.openSchduleModal = true;
        },
        closeScheduleModal(state) {
            state.openSchduleModal = false;
        },
        initializeSelectedDay(state) {
            state.selectedDay = null;
        },
        setSelectedDay(state, action: PayloadAction<{ year: number; month: number; day: number }>) {
            state.selectedDay = action.payload;
        },
    },
});

export const {
    setYear,
    setMonth,
    openScheduleModal,
    initializeSelectedDay,
    closeScheduleModal,
    setSelectedDay,
} = artistSlice.actions;
export default artistSlice.reducer;
