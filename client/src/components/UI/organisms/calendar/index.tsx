import React from 'react';
import styled from 'styled-components';
import CalendarHeader from '@molecules/calendarHeader';
import CalendarBody from '../../molecules/calendarBody';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';
import { ArtistStore } from '@/types/artist';
import ScheduleFanUpModal from '../../molecules/scheduleFanUpModal';

const CalendarWrapper = styled.div`
    width: 80vw;
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
    const { openSchduleModal } = useSelector<ReducerType, ArtistStore>(
        (state) => state.artistSlice
    );
    return (
        <CalendarWrapper>
            <h1 data-testid="title">LILHUDDY님의 일정</h1>
            <CalendarHeader />
            <CalendarBody />
            {openSchduleModal ? <ScheduleFanUpModal /> : null}
        </CalendarWrapper>
    );
};

export default Calendar;
