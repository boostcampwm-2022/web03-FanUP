import { openScheduleModal, setSelectedDay } from '@/store/artist';
import { ReducerType } from '@/store/rootReducer';
import { ArtistStore } from '@/types/artist';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { makeDay, week } from './utils';

const CalendarBodyWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: left;
    font-weight: 700;
    gap: 5px;
`;

const WeekGuide = styled.div`
    padding: 15px 0px 15px 10px;
`;

const DateCell = styled.div<{ isCurrentMonth: boolean; isHoliday: boolean; isToday: boolean }>`
    color: ${({ isCurrentMonth, theme, isHoliday, isToday }) =>
        isToday
            ? 'white'
            : isCurrentMonth
            ? isHoliday
                ? theme.PINK
                : 'black'
            : theme.MEDIUM_GRAY};
    background: ${({ theme, isToday }) => (isToday ? '#474747' : theme.LIGHT_GRAY)};
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.MEDIUM_GRAY};
        color: white;
        transition: 0.25s;
    }
`;

const DateContent = styled.div`
    min-height: 50px;
`;

const CalendarBody = () => {
    const dispatch = useDispatch();
    const { calendarYear: year, calendarMonth: month } = useSelector<ReducerType, ArtistStore>(
        (state) => state.artistSlice
    );
    const days = useMemo(() => makeDay({ year, month }), [year, month]);

    const openModal = useCallback(
        (day: number) => () => {
            dispatch(setSelectedDay({ year, month, day }));
            dispatch(openScheduleModal());
        },
        [year, month]
    );

    return (
        <CalendarBodyWrapper>
            {week.map((day) => (
                <WeekGuide key={day}>
                    <span>{day}</span>
                </WeekGuide>
            ))}
            {days.map(({ day, isCurrentMonth, isHoliday, isToday }, idx) => (
                <div key={`${day}${idx}`} data-testid={idx}>
                    <DateCell
                        isToday={isToday}
                        isHoliday={isHoliday}
                        isCurrentMonth={isCurrentMonth}
                        onClick={openModal(day)}
                    >
                        {day}
                    </DateCell>
                    <DateContent></DateContent>
                </div>
            ))}
        </CalendarBodyWrapper>
    );
};

export default CalendarBody;
