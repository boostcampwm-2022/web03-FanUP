import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { socialLogin } from '@/utils/OAuth';
import Button from '@atoms/Button';
import NaverIcon from '@/components/icons/Naver';
import GoogleIcon from '@/components/icons/Google';
import KakaoIcon from '@/components/icons/Kakao';
import FaceBookIcon from '@/components/icons/FaceBook';

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
        margin-left: 10px;
    }
`;

const OAuthContainer: FC = () => {
    const OAuthCategory = {
        naver: {
            title: 'Naver',
            backgroundColor: '#0eb817',
            color: '#FFFFFF',
            icon: <NaverIcon />,
        },
        google: {
            title: 'Google',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            icon: <GoogleIcon />,
        },
        kakao: {
            title: 'Kakao',
            backgroundColor: '#F7E600',
            color: '#FFFFFF',
            icon: <KakaoIcon />,
        },
        facebook: {
            title: 'Facebook',
            backgroundColor: '#445DD0',
            color: '#FFFFFF',
            icon: <FaceBookIcon />,
        },
    };

    return (
        <StyledOAuthContainer>
            {Object.entries(OAuthCategory).map(([key, value]) => (
                <OAuthButton
                    onClick={() => socialLogin(key)}
                    key={key}
                    backgroundColor={value.backgroundColor}
                    color={value.color}
                >
                    {value.icon} <span>{value.title}</span>
                </OAuthButton>
            ))}
        </StyledOAuthContainer>
    );
};

export default OAuthContainer;
