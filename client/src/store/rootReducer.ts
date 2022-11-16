import { artistApi } from '@/services/artist';
import { userApi } from '@/services/user';
import { combineReducers } from '@reduxjs/toolkit';
import artistSlice from './artist';
import userSlice from './user';

const reducer = combineReducers({
    artistSlice,
    userSlice,
    [artistApi.reducerPath]: artistApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
