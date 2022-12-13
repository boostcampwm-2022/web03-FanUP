import { get_D_Day, isDDay } from '@utils/get_D_Day';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DDayWrapper = styled.div<{ isDDay: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-weight: 700;
    color: ${({ isDDay, theme }) => isDDay && theme.PINK};
    border-left: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    padding-left: 10px;
    button {
        cursor: pointer;
        border: none;
        background: ${({ theme }) => theme.PINK};
        color: white;
        border-radius: 8px;
        padding: 15px 10px;
        &:hover {
            background: #ff8099;
            //color: ${({ theme }) => theme.DARK_GRAY};
        }
    }
`;

interface Props {
    date: Date;
    isMyTicketMode?: boolean;
    fanupId?: string;
}

const DDay = ({ date, isMyTicketMode, fanupId }: Props) => {
    const D_Day = useMemo(() => get_D_Day(date), [date]);
    const navigate = useNavigate();
    const gotoFanUP = useCallback(() => {
        navigate(`/fanup/${fanupId}`);
    }, []);
    return (
        <DDayWrapper isDDay={isDDay(date)}>
            {isMyTicketMode && D_Day === 'D-Day' ? (
                <button onClick={gotoFanUP}>FanUP입장</button>
            ) : (
                <span>{D_Day}</span>
            )}
        </DDayWrapper>
    );
};

export default DDay;
