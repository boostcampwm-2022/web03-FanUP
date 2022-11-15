import React, { FC } from 'react';
import styled from 'styled-components';

import { socialLogin } from '@/utils/OAuth';
import Button from '@atoms/Button';

const StyledOAuthContainer = styled.div`
    width: 490px;
    height: 360px;
    background-color: ${({ theme }) => theme.LIGHT_GRAY};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const OAuthContainer: FC = () => {
    return (
        <StyledOAuthContainer>
            <Button
                onClick={() => socialLogin('naver')}
                text="네이버 로그인"
                width="425px"
                height="60px"
                backgroundColor="#0eb817"
                color="white"
            ></Button>
            <Button
                onClick={() => socialLogin('google')}
                text="Google 로그인"
                width="425px"
                height="60px"
                backgroundColor="#FFFFFF"
            ></Button>
            <Button
                onClick={() => socialLogin('kakao')}
                text="Kakao 로그인"
                width="425px"
                height="60px"
                backgroundColor="#F7E600"
            ></Button>
            <Button
                onClick={() => socialLogin('facebook')}
                text="Facebook 로그인"
                width="425px"
                height="60px"
                backgroundColor="#445DD0"
                color="white"
            ></Button>
        </StyledOAuthContainer>
    );
};

export default OAuthContainer;
