import React, { useCallback } from 'react';
import NextBtnIcon from '@/components/icons/NextBtnIcon';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '@store/rootReducer';
import { CalendarData } from '@/types/artist';
import { setMonth, setYear } from '@/store/artist';

const CalendarNextBtn = () => {
    const dispatch = useDispatch();
    const { calendarYear: year, calendarMonth: month } = useSelector<ReducerType, CalendarData>(
        ({ artistSlice }) => ({
            calendarYear: artistSlice.calendarYear,
            calendarMonth: artistSlice.calendarMonth,
        }),
        shallowEqual
    );

    const clickNext = useCallback(() => {
        if (month === 12) {
            dispatch(setYear(year + 1));
            dispatch(setMonth(1));
        } else dispatch(setMonth(month + 1));
    }, [month, year]);

    return (
        <button data-testid="calendarNextBtn" onClick={clickNext}>
            <NextBtnIcon stroke="#333d4b" />
        </button>
    );
};

export default CalendarNextBtn;
