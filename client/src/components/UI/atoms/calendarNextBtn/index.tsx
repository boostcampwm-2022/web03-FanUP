import React, { useCallback } from 'react';
import NextBtnIcon from '@/components/icons/next';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '@store/rootReducer';
import { ArtistStore } from '@/types/artist';
import { setMonth, setYear } from '@store/artist';

const CalendarNextBtn = () => {
    const dispatch = useDispatch();
    const { calendarMonth: month, calendarYear: year } = useSelector<ReducerType, ArtistStore>(
        (state) => state.artistSlice
    );

    const clickNext = useCallback(() => {
        if (month === 12) {
            dispatch(setYear(year + 1));
            dispatch(setMonth(1));
        } else dispatch(setMonth(month + 1));
    }, [month, year]);

    return (
        <button data-testid="calendarNextBtn" onClick={clickNext}>
            <NextBtnIcon />
        </button>
    );
};

export default CalendarNextBtn;
