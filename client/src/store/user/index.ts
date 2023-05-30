import { UserStore } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const 아티스트만나보기 = 1;

export const initialState: UserStore = {
    id: null,
    nickName: null,
    accessToken: null,
    expiredDate: null,
    myStream: null,
    token: null,
    artistListViewMode: 아티스트만나보기,
    userDropDown: false,
    openNotificationModal: false,
    isUserHandleSubscribed: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.id = id;
        },
        logout(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.id = id;
        },
        setMyStream(state, action: PayloadAction<MediaStream>) {
            state.myStream = action.payload;
        },
        initializeMyStream(state) {
            state.myStream = null;
        },
        setArtistListViewMode(state, action: PayloadAction<number>) {
            state.artistListViewMode = action.payload;
        },
        setToken(state, action: PayloadAction<number | null>) {
            state.token = action.payload;
        },
        toggleUserDropDown(state) {
            state.openNotificationModal = false;
            state.userDropDown = !state.userDropDown;
        },
        closeUserDropDown(state) {
            state.userDropDown = false;
        },
        toggleNotificationModal(state) {
            state.userDropDown = false;
            state.openNotificationModal = !state.openNotificationModal;
        },
        handleSubscribed(state) {
            state.isUserHandleSubscribed = true;
        },
        resetHandleSubscribed(state) {
            state.isUserHandleSubscribed = false;
        },
    },
});

export const {
    toggleNotificationModal,
    toggleUserDropDown,
    closeUserDropDown,
    setToken,
    login,
    logout,
    setMyStream,
    initializeMyStream,
    setArtistListViewMode,
    handleSubscribed,
    resetHandleSubscribed,
} = userSlice.actions;

export default userSlice.reducer;
