import { useGetSchedulesQuery } from '@/services/artist.service';
import { useAppDispatch } from '@/store';
import { openScheduleModal, setSelectedDay } from '@/store/artist';
import { ReducerType } from '@/store/rootReducer';
import { CalendarData } from '@/types/artist';
import { dateDiff } from '@/utils/dateDiff';
import React, { useCallback, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '@atoms/Loading';
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

const Cell = styled.div`
    overflow: hidden;
`;

const DateContent = styled.div`
    min-height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    div {
        height: 22px;
        padding: 5px 10px;
        font-size: 12px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: white;
    }
`;

const ScheduleContent = styled.div<{ isPast: boolean }>`
    background: ${({ theme, isPast }) => (isPast ? theme.PINK : theme.PRIMARY)};
`;

const CalendarBody = () => {
    const dispatch = useAppDispatch();
    const { calendarYear, calendarMonth } = useSelector<ReducerType, CalendarData>(
        ({ artistSlice }) => ({
            calendarYear: artistSlice.calendarYear,
            calendarMonth: artistSlice.calendarMonth,
        }),
        shallowEqual
    );
    const {
        isLoading,
        data: schedules,
        isFetching,
    } = useGetSchedulesQuery({
        calendarYear,
        calendarMonth,
    });

    const days = useMemo(
        () => makeDay({ calendarYear, calendarMonth }),
        [calendarYear, calendarMonth]
    );

    const openModal = useCallback(
        (day: number, isCurrentMonth: boolean, isToday: boolean) => () => {
            if (!isCurrentMonth) return;
            if (!isToday) {
                const targetDate = new Date(`${calendarYear} ${calendarMonth} ${day}`);
                const [dayDiff] = dateDiff(targetDate, new Date());
                if (dayDiff < 0) return alert('이미 지나간 시간을 그리워하지마세요 :(');
            }

            dispatch(setSelectedDay({ calendarYear, calendarMonth, day }));
            dispatch(openScheduleModal());
        },
        [calendarYear, calendarMonth]
    );

    if (isLoading || isFetching) return <Loading />;

    return (
        <CalendarBodyWrapper>
            {week.map((day) => (
                <WeekGuide key={day}>
                    <span>{day}</span>
                </WeekGuide>
            ))}
            {days?.map(({ day, isCurrentMonth, isHoliday, isToday }, idx) => (
                <Cell key={`${day}${idx}`} data-testid={idx}>
                    <DateCell
                        isToday={isToday}
                        isHoliday={isHoliday}
                        isCurrentMonth={isCurrentMonth}
                        onClick={openModal(day, isCurrentMonth, isToday)}
                    >
                        {day}
                    </DateCell>
                    <DateContent>
                        {schedules &&
                            schedules[day - 1]?.map(({ data, isPast }: any) => (
                                <ScheduleContent isPast={isPast} key={data.title}>
                                    {data.title}
                                </ScheduleContent>
                            ))}
                    </DateContent>
                </Cell>
            ))}
        </CalendarBodyWrapper>
    );
};

export default CalendarBody;
