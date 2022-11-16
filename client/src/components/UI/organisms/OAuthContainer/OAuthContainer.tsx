import React, { FC } from 'react';
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
        NAVER: { backgroundColor: '#0eb817', color: '#FFFFFF' },
        Google: { backgroundColor: '#FFFFFF', color: '#000000' },
        Kakao: { backgroundColor: '#F7E600', color: '#FFFFFF' },
        Facebook: { backgroundColor: '#445DD0', color: '#FFFFFF' },
    };

    return (
        <StyledOAuthContainer>
            {Object.entries(OAuthCategory).map(([key, value]) => (
                <Button
                    key={key}
                    onClick={() => socialLogin(key)}
                    text={key + '로그인'}
                    width="440px"
                    height="64px"
                    backgroundColor={value.backgroundColor}
                    color={value.color}
                ></Button>
            ))}
        </StyledOAuthContainer>
    );
};

export default OAuthContainer;
