import { ArtistStore } from '@/types/artist';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ArtistStore = {
    name: '',
};

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        testAction(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name;
        },
    },
});

export const { testAction } = artistSlice.actions;
export default artistSlice.reducer;
