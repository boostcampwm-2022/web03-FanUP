import React, { useCallback } from 'react';
import PrevBtnIcon from '@/components/icons/prev';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '@store/rootReducer';
import { ArtistStore } from '@/types/artist';
import { setMonth, setYear } from '@store/artist';

const CalendarPrevBtn = () => {
    const dispatch = useDispatch();
    const { calendarMonth: month, calendarYear: year } = useSelector<ReducerType, ArtistStore>(
        (state) => state.artistSlice
    );

    const clickPrev = useCallback(() => {
        if (month === 1) {
            dispatch(setYear(year - 1));
            dispatch(setMonth(12));
        } else dispatch(setMonth(month - 1));
    }, [month, year]);

    return (
        <button onClick={clickPrev}>
            <PrevBtnIcon />
        </button>
    );
};

export default CalendarPrevBtn;
