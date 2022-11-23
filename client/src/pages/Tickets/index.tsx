import React from 'react';
import styled from 'styled-components';
import Schedules from '@organisms/schedules';
import Header from '@organisms/header';
import TodayTickets from '@/components/UI/organisms/todayTickets';

const ContentsWrapper = styled.div`
    display: flex;
    gap: 80px;
    padding: 80px 30px;
`;

const TicketsWrapper = styled.div`
    padding-top: 20px;
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
                <Schedules />
                <TicketsWrapper>
                    <h1>오늘 마감</h1>
                    <TodayTickets />
                    <h1>둘러 보기</h1>
                </TicketsWrapper>
            </ContentsWrapper>
        </>
    );
};

export default Tickets;
