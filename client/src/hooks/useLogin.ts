import { useGetAllArtistsQuery } from '@/services/artist.service';
import { useSubmitAccessTokenMutation } from '@/services/user.service';
import { setToken } from '@/store/user';
import { useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';

interface ITokenData {
    accessToken: string;
    provider: string;
}

export const useLogin = () => {
    const [mutate] = useSubmitAccessTokenMutation();
    const { refetch } = useGetAllArtistsQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = useCallback(async ({ accessToken, provider }: ITokenData) => {
        const { data } = (await mutate({ accessToken, provider })) as { data: any };
        if (data.error) return alert(data.error);
        localStorage.setItem('userId', data.profile.id);
        localStorage.setItem('token', data.accessToken);
        refetch();
        dispatch(setToken(data.accessToken));
        navigate('/');
    }, []);

    return login;
};
