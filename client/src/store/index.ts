import { artistApi } from '@/services/artist.service';
import { fanupApi } from '@/services/fanup.service';
import { ticketApi } from '@/services/ticket.service';
import { userApi } from '@/services/user.service';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false })
            .concat(artistApi.middleware)
            .concat(userApi.middleware)
            .concat(ticketApi.middleware)
            .concat(fanupApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
