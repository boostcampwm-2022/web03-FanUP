import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@atoms/Button';

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

export interface domain {
    [key: string]: {
        title: string;
        url: string;
        backgroundColor: string;
        color: string;
    };
}

export const OAuthCategory: domain = {
    naver: { title: 'NAVER', url: ``, backgroundColor: '#0eb817', color: '#FFFFFF' },
    google: {
        title: 'Google',
        url: `http://api.fanup.live:4001/auth/google`,
        backgroundColor: '#FFFFFF',
        color: '#000000',
    },
    kakao: {
        title: 'Kakao',
        url: `http://api.fanup.live:4001/auth/kakao`,
        backgroundColor: '#F7E600',
        color: '#FFFFFF',
    },
    facebook: { title: 'Facebook', url: ``, backgroundColor: '#445DD0', color: '#FFFFFF' },
};

const OAuthContainer: FC = () => {
    const socialLogin = useCallback((domain: string): void => {
        if (!OAuthCategory[domain].url) {
            alert('준비중입니다.');
            return;
        }
        (window as Window).location = OAuthCategory[domain].url;
    }, []);

    return (
        <StyledOAuthContainer>
            {Object.entries(OAuthCategory).map(([key, value]) => (
                <Button
                    key={key}
                    content={key + '로그인'}
                    onClick={() => socialLogin(key)}
                    width="440px"
                    height="64px"
                    backgroundColor={value.backgroundColor}
                    color={value.color}
                    borderRadius="8px"
                ></Button>
            ))}
        </StyledOAuthContainer>
    );
};

export default OAuthContainer;
