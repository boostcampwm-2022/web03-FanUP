import { useSubmitAccessTokenMutation } from '@/services/user.service';
import { setToken } from '@/store/user';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ITokenData {
    accessToken: string;
    provider: string;
}

export const useLogin = () => {
    const [mutate] = useSubmitAccessTokenMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useCallback(async ({ accessToken, provider }: ITokenData) => {
        const { data } = (await mutate({ accessToken, provider })) as { data: any };
        if (data.error) return alert(data.error);

        localStorage.setItem('token', data.accessToken);
        dispatch(setToken(data.accessToken));
        navigate('/');
    }, []);

    return login;
};
