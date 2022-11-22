export interface UserStore {
    [key: string]: any;
    id: null | string;
    nickName: null | string;
    accessToken: null | string;
    expiredDate: null | string;
    myStream: MediaStream | null;
}
