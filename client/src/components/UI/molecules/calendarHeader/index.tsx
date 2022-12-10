import React from 'react';
import { ReducerType } from '@store/rootReducer';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';

import CalendarPrevBtn from '@atoms/calendarPrevBtn';
import CalendarNextBtn from '@atoms/calendarNextBtn';
import { addZero } from '@utils/addZero';

const CalendarHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    h2 {
        font-weight: 700;
        font-size: 32px;
    }
`;

const CalendarHeaderLeft = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    button {
        cursor: pointer;
        background: none;
        border: none;
        svg {
            width: 10px;
            height: 20px;
        }
    }
`;

const CalendarHeaderRight = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Guide = styled.div<{ background: string }>`
    display: flex;
    align-items: center;
    gap: 5px;
    div {
        width: 15px;
        height: 15px;
        border-radius: 3px;
        background: ${({ background }) => background};
    }
    span {
        font-size: 12px;
    }
`;

export const guide = [
    { background: '#9E57FF', text: '예정' },
    { background: '#FF6666', text: '완료' },
];
interface StoreState {
    calendarMonth: number;
    calendarYear: number;
}

const CalendarHeader = () => {
    const { calendarYear: year, calendarMonth: month } = useSelector<ReducerType, StoreState>(
        ({ artistSlice }) => ({
            calendarYear: artistSlice.calendarYear,
            calendarMonth: artistSlice.calendarMonth,
        }),
        shallowEqual
    );

    return (
        <CalendarHeaderWrapper>
            <CalendarHeaderLeft>
                <CalendarPrevBtn />
                <h2>
                    {year}.{addZero(month)}
                </h2>
                <CalendarNextBtn />
            </CalendarHeaderLeft>
            <CalendarHeaderRight>
                {guide.map(({ background, text }) => (
                    <Guide background={background} key={text}>
                        <div></div>
                        <span>{text}</span>
                    </Guide>
                ))}
            </CalendarHeaderRight>
        </CalendarHeaderWrapper>
    );
};

export default CalendarHeader;
