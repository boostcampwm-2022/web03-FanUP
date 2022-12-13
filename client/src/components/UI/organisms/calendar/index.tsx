import React from 'react';
import styled from 'styled-components';
import CalendarHeader from '@molecules/calendarHeader';
import CalendarBody from '@molecules/calendarBody';
import ScheduleFanUpModal from '@molecules/scheduleFanUpModal';
import { useGetUserQuery } from '@/services/user.service';

const CalendarWrapper = styled.div`
    width: 60vw;
    min-width: 500px;
    padding: 40px;
    background: white;
    border-radius: 16px;
    h1 {
        font-weight: 700;
        font-size: 32px;
    }
`;

const Calendar = () => {
    const { data: userData } = useGetUserQuery();

    return (
        <CalendarWrapper>
            <h1 data-testid="title">{userData?.artist?.name}님의 일정</h1>
            <CalendarHeader />
            <CalendarBody />
            <ScheduleFanUpModal />
        </CalendarWrapper>
    );
};

export default Calendar;
