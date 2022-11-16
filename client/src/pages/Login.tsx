import React, { FC } from 'react';
import styled from 'styled-components';

import loginImg from '@images/login.svg';
import OAuthContainer from '@organisms/OAuthContainer';

// interface Props {}

const AppLayout = styled.div`
    background-color: ${({ theme }) => theme.PRIMARY};
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
`;

const StyledWelcome = styled.div`
    display: flex;
    flex-direction: column;

    span {
        font-size: 48px;
        font-weight: bold;
        color: white;
        margin-bottom: 16px;
    }
`;

const Login: FC = () => {
    return (
        <AppLayout>
            <StyledWelcome>
                <span>
                    반가워요~
                    <br />
                    비대면 팬미팅 서비스 FanUP입니다
                </span>
                <img src={loginImg} alt="" />
            </StyledWelcome>
            <OAuthContainer />
        </AppLayout>
    );
};

export default Login;
