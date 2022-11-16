import { artistApi } from '@/services/artist';
import { userApi } from '@/services/user';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(artistApi.middleware).concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
