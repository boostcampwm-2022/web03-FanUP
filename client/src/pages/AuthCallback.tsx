import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AuthCallback: FC = () => {
    const [cookie, setCookie] = useCookies(['id']);
    const navigate = useNavigate();

    const getToken = useCallback(async () => {
        try {
            const authCode = new URLSearchParams(location.search).get('code');
            await axios({
                url: '/api',
                method: 'post',
                data: { code: authCode },
            });
            navigate('/');
        } catch (err) {
            alert('로그인을 다시 해주세요');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        getToken();
    }, []);

    return <div>슈크림 붕어빵</div>;
};

export default AuthCallback;
