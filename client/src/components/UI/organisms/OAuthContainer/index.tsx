import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import NaverIcon from '@/components/icons/Naver';
import GoogleIcon from '@/components/icons/Google';
import KakaoIcon from '@/components/icons/Kakao';
import FaceBookIcon from '@/components/icons/FaceBook';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';
import { useSubmitAccessTokenMutation } from '@/services/user.service';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';

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
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID as string}>
                <GoogleLoginButton />
            </GoogleOAuthProvider>
            <KaKaoLoginButton />
            {Object.keys(OAuthCategory).map((key) => (
                <OAuthButton
                    key={OAuthCategory[key].title}
                    backgroundColor={OAuthCategory[key].backgroundColor}
                    color={OAuthCategory[key].color}
                    onClick={() => alert('해당 서비스는 준비 중입니다.')}
                >
                    {OAuthCategory[key].icon}
                    <span>{OAuthCategory[key].title}</span>
                </OAuthButton>
            ))}
        </StyledOAuthContainer>
    );
};

const GoogleLoginButton = () => {
    const login = useLogin();

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ access_token: accessToken }) => {
            await login({ accessToken, provider: 'google' });
        },
    });

    return (
        <OAuthButton onClick={() => googleLogin()} backgroundColor="white" color="black">
            <GoogleIcon /> <span>Google</span>
        </OAuthButton>
    );
};

const KaKaoLoginButton = () => {
    const login = useLogin();

    const KaKaoLoginSuccess = useCallback(async (accessToken: string) => {
        await login({ accessToken, provider: 'kakao' });
    }, []);

    return (
        <KakaoLogin
            token={process.env.REACT_APP_KAKAO_ID as string}
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
