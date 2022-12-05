import Fish from '@icons/Fish';
import Header from '@organisms/header';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@atoms/Button';
import theme from '@/style/theme';

const FailureWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 75px);
    padding: 150px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const FailureText = styled.div`
    border-radius: 8px;
    font-weight: 700;
    font-size: 40px;
    padding: 10px 25px;
`;

const LogoWrapper = styled.div`
    position: relative;
    img {
        position: absolute;
        left: 0;
        top: 0;
    }
    svg {
        margin-top: 20px;
    }
`;

const Description = styled.div`
    font-size: 20px;
    text-align: center;
    line-height: 40px;
`;

const TicketingFailure = () => {
    const navigate = useNavigate();
    const gotoHome = useCallback(() => {
        navigate('/');
    }, []);
    return (
        <>
            <Header />
            <FailureWrapper>
                <FailureText>티켓팅 실패...</FailureText>
                <LogoWrapper>
                    <Fish />
                    <img src="/x.png" alt="x" />
                </LogoWrapper>
                <Description>
                    아쉽게도 티켓팅에 실패했어요. <br />
                    다음 기회에 티켓팅을 다시 시도해주세요.
                </Description>
                <Button
                    onClick={gotoHome}
                    content="메인으로 가기"
                    backgroundColor={theme.PRIMARY}
                    padding="10px 20px"
                    color="white"
                    borderRadius="8px"
                    hoverBackgroundColor={theme.PRIMARY_LIGHT}
                />
            </FailureWrapper>
        </>
    );
};

export default TicketingFailure;
