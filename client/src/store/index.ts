import { artistApi } from '@/services/artist.service';
import { fanupApi } from '@/services/fanup.service';
import { fileApi } from '@/services/file.service';
import { ticketApi } from '@/services/ticket.service';
import { userApi } from '@/services/user.service';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false })
            .concat(artistApi.middleware)
            .concat(userApi.middleware)
            .concat(ticketApi.middleware)
            .concat(fanupApi.middleware)
            .concat(fileApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
