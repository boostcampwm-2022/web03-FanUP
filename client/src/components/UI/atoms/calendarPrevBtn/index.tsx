import React, { useCallback } from 'react';
import PrevBtnIcon from '@/components/icons/PrevBtnIcon';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '@store/rootReducer';
import { CalendarData } from '@/types/artist';
import { setMonth, setYear } from '@/store/artist';

const CalendarPrevBtn = () => {
    const dispatch = useDispatch();

    const { calendarYear: year, calendarMonth: month } = useSelector<ReducerType, CalendarData>(
        ({ artistSlice }) => ({
            calendarYear: artistSlice.calendarYear,
            calendarMonth: artistSlice.calendarMonth,
        }),
        shallowEqual
    );

    const clickPrev = useCallback(() => {
        if (month === 1) {
            dispatch(setYear(year - 1));
            dispatch(setMonth(12));
        } else dispatch(setMonth(month - 1));
    }, [month, year]);

    return (
        <button data-testid="calendarPrevBtn" onClick={clickPrev}>
            <PrevBtnIcon stroke="#333d4b" />
        </button>
    );
};

export default CalendarPrevBtn;
