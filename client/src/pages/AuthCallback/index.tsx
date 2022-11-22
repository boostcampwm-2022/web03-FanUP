import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Loading from '@atoms/Loading';

const StyledAuthCallback = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AuthCallback: FC = () => {
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
            navigate('/');
        }
    }, []);

    useEffect(() => {
        getToken();
    }, []);

    return (
        <StyledAuthCallback>
            <Loading />
        </StyledAuthCallback>
    );
};

export default AuthCallback;
