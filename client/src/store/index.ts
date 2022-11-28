import { artistApi } from '@/services/artist';
import { ticketApi } from '@/services/ticket';
import { userApi } from '@/services/user';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false })
            .concat(artistApi.middleware)
            .concat(userApi.middleware)
            .concat(ticketApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
