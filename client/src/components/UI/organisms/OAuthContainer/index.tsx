import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import NaverIcon from '@/components/icons/Naver';
import GoogleIcon from '@/components/icons/Google';
import KakaoIcon from '@/components/icons/Kakao';
import FaceBookIcon from '@/components/icons/FaceBook';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';
import { useSubmitAccessTokenMutation } from '@/services/user';
import { useNavigate } from 'react-router-dom';

const StyledOAuthContainer = styled.div`
    width: 520px;
    height: 390px;
    background-color: ${({ theme }) => theme.LIGHT_GRAY};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    button {
        cursor: pointer;
        width: 80% !important;
        font-size: 20px !important;
        font-weight: 700 !important;
        height: 64px !important;
        span {
            margin-left: 0px;
        }
    }
`;

const OAuthButton = styled.button<{ backgroundColor: string; color: string }>`
    width: 440px;
    height: 64px;
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ color }) => color};
    border-radius: 8px;
    border: none;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
        margin-left: 5px !important;
    }
`;

interface domain {
    [key: string]: {
        title: string;
        url: string;
        backgroundColor: string;
        color: string;
        icon: JSX.Element;
    };
}

const OAuthCategory: domain = {
    naver: {
        title: 'Naver',
        backgroundColor: '#0eb817',
        url: ``,
        color: '#FFFFFF',
        icon: <NaverIcon />,
    },
    facebook: {
        title: 'Facebook',
        backgroundColor: '#445DD0',
        url: '',
        color: '#FFFFFF',
        icon: <FaceBookIcon />,
    },
};

const OAuthContainer: FC = () => {
    return (
        <StyledOAuthContainer>
            <GoogleOAuthProvider clientId="469714351066-4m6rgiackka9ssie99d6hatiucbqctjm.apps.googleusercontent.com">
                <GoogleLoginButton />
            </GoogleOAuthProvider>
            <KaKaoLoginButton />
            {Object.keys(OAuthCategory).map((key) => (
                <OAuthButton
                    key={OAuthCategory[key].title}
                    backgroundColor={OAuthCategory[key].backgroundColor}
                    color={OAuthCategory[key].color}
                >
                    {OAuthCategory[key].icon}
                    <span>{OAuthCategory[key].title}</span>
                </OAuthButton>
            ))}
        </StyledOAuthContainer>
    );
};

const GoogleLoginButton = () => {
    const [mutate] = useSubmitAccessTokenMutation();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ access_token: accessToken }) => {
            await mutate({ accessToken, provider: 'google' });
            navigate('/');
        },
    });

    return (
        <OAuthButton onClick={() => googleLogin()} backgroundColor="white" color="black">
            <GoogleIcon /> <span>Google</span>
        </OAuthButton>
    );
};

const KaKaoLoginButton = () => {
    const [mutate] = useSubmitAccessTokenMutation();
    const navigate = useNavigate();

    const KaKaoLoginSuccess = useCallback(async (accessToken: string) => {
        await mutate({ accessToken, provider: 'kakao' });
        navigate('/');
    }, []);

    return (
        <KakaoLogin
            token={'a17505265150166f5db498508262e5f3'}
            onSuccess={({ response }) => KaKaoLoginSuccess(response.access_token)}
            onFail={() => alert('카카오 로그인 실패')}
            onLogout={() => console.log('로그아웃')}
        >
            <>
                <KakaoIcon /> <span>KaKao</span>
            </>
        </KakaoLogin>
    );
};

export default OAuthContainer;
