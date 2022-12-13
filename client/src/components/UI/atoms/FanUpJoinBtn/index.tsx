import { useGetUserTicketsQuery } from '@/services/ticket.service';
import { get_D_Day, isDDay } from '@utils/get_D_Day';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FanUpJoinBtnWrapper = styled.div<{ isDDay: boolean }>`
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
    fanupId?: string;
    ticketId?: number;
}

const FanUpJoinBtn = ({ date, fanupId, ticketId }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { refetch } = useGetUserTicketsQuery();

    const gotoFanUP = useCallback(() => {
        if (!fanupId) {
            refetch();
            return alert('FanUP방을 생성 중입니다.\n 잠시 후, 다시 시도해주세요.');
        }
        const url = `/fanup/${fanupId}`;
        if (isArtistJoinRoom(pathname)) navigate(url + `?ticketId=${ticketId}`);
        else navigate(url);
    }, [pathname, fanupId]);

    return (
        <FanUpJoinBtnWrapper isDDay={isDDay(date)}>
            <button onClick={gotoFanUP}>FanUP입장</button>
        </FanUpJoinBtnWrapper>
    );
};

const isArtistJoinRoom = (pathname: string) => (pathname === '/schedule' ? true : false);

export default FanUpJoinBtn;
