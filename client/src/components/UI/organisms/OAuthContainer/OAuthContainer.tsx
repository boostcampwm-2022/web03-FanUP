import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { socialLogin } from '@/utils/OAuth';
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

const OAuthContainer: FC = () => {
    const OAuthCategory = {
        naver: { title: 'NAVER', backgroundColor: '#0eb817', color: '#FFFFFF' },
        google: { title: 'Google', backgroundColor: '#FFFFFF', color: '#000000' },
        kakao: { title: 'Kakao', backgroundColor: '#F7E600', color: '#FFFFFF' },
        facebook: { title: 'Facebook', backgroundColor: '#445DD0', color: '#FFFFFF' },
    };

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
