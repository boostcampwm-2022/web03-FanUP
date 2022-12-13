import React from 'react';
import styled from 'styled-components';
import FanFeatureBox from '@/components/UI/organisms/FanFeatureBox';
import Header from '@organisms/header';
import TodayTickets from '@organisms/todayTickets';
import AllTickets from '@/components/UI/organisms/allTickets';
import withGetUser from '@/components/hoc/withGetUser';
const ContentsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 80px 30px;
    min-height: calc(100vh - 75px);
    padding: 40px;
    background: ${({ theme }) => theme.LIGHT_GRAY};
`;

const TicketsWrapper = styled.div`
    padding: 40px;
    overflow: hidden;
    background: white;
    border-radius: 8px;
    h1 {
        font-weight: 700;
        font-size: 25px;
        margin-bottom: 20px;
    }
`;

const Tickets = () => {
    return (
        <>
            <Header />
            <ContentsWrapper>
                <FanFeatureBox />
                <TicketsWrapper>
                    <h1>오늘 마감</h1>
                    <TodayTickets />
                    <h1>둘러 보기</h1>
                    <AllTickets />
                </TicketsWrapper>
            </ContentsWrapper>
        </>
    );
};

export default withGetUser(Tickets);
