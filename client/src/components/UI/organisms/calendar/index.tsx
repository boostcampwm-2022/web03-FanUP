import React from 'react';
import styled from 'styled-components';
import CalendarHeader from '@molecules/calendarHeader';
import CalendarBody from '../../molecules/calendarBody';
import ScheduleFanUpModal from '../../molecules/scheduleFanUpModal';

const CalendarWrapper = styled.div`
    width: 60vw;
    min-width: 500px;
    padding: 60px 40px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    h1 {
        font-weight: 700;
        font-size: 32px;
    }
`;

const Calendar = () => {
    return (
        <CalendarWrapper>
            <h1 data-testid="title">LILHUDDY님의 일정</h1>
            <CalendarHeader />
            <CalendarBody />
            <ScheduleFanUpModal />
        </CalendarWrapper>
    );
};

export default Calendar;
