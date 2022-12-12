export interface UserStore {
    [key: string]: any;
    id: null | string;
    nickName: null | string;
    accessToken: null | string;
    expiredDate: null | string;
    myStream: MediaStream | null;
    artistListViewMode: number;
}

export interface IUser {
    id: number;
    type: string;
    email: string;
    nickname: string;
    artistId?: number;
    role: string;
    artist?: {
        id: number;
        name: string;
        profileUrl: string;
    };
}
