import { artistApi } from '@/services/artist.service';
import { userApi } from '@/services/user.service';
import { combineReducers } from '@reduxjs/toolkit';
import artistSlice from './artist';
import userSlice from './user';
import fanUpSlice from './fanUp';
import { ticketApi } from '@/services/ticket.service';
import { fanupApi } from '@/services/fanup.service';
import { fileApi } from '@/services/file.service';

const reducer = combineReducers({
    artistSlice,
    userSlice,
    fanUpSlice,
    [artistApi.reducerPath]: artistApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [fanupApi.reducerPath]: fanupApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
