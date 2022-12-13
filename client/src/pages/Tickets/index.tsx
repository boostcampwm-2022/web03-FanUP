import React from 'react';
import styled from 'styled-components';
import FanFeatureBox from '@/components/UI/organisms/FanFeatureBox';
import Header from '@organisms/header';
import TodayTickets from '@organisms/todayTickets';
import AllTickets from '@/components/UI/organisms/allTickets';
import withGetUser from '@/components/hoc/withGetUser';
const ContentsWrapper = styled.div`
    display: flex;
    gap: 40px;
    padding: 80px 30px;
`;

const TicketsWrapper = styled.div`
    padding-top: 20px;
    overflow: hidden;
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
