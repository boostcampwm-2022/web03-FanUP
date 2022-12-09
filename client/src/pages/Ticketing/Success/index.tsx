import Button from '@atoms/Button';
import theme from '@/style/theme';
import Fish from '@icons/Fish';
import Header from '@organisms/header';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuccessWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 75px);
    background: ${({ theme }) => theme.SECONDARY};
    padding: 150px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SuccessBackground = styled.div`
    width: 50vw;
    height: 50vh;
    z-index: 10;
    background-image: url('/successBackground.png');
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const SuccessText = styled.div`
    background: ${({ theme }) => theme.PRIMARY};
    color: white;
    border-radius: 8px;
    font-weight: 700;
    font-size: 40px;
    padding: 10px 25px;
`;

const LogoWrapper = styled.div`
    background: white;
    border-radius: 100%;
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TicketingSuccess = () => {
    const navigate = useNavigate();
    const gotoHome = useCallback(() => {
        navigate('/');
    }, []);
    return (
        <>
            <Header />
            <SuccessWrapper>
                <SuccessBackground>
                    <SuccessText>티켓팅 성공!</SuccessText>
                    <LogoWrapper>
                        <Fish />
                    </LogoWrapper>
                    <Button
                        onClick={gotoHome}
                        content="메인으로 가기"
                        backgroundColor={theme.PRIMARY}
                        padding="10px 20px"
                        color="white"
                        borderRadius="8px"
                        hoverBackgroundColor={theme.PRIMARY_LIGHT}
                    />
                </SuccessBackground>
            </SuccessWrapper>
        </>
    );
};

export default TicketingSuccess;
