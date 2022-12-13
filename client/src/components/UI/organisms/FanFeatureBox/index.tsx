import ScheduleIcon from '@icons/ScheduleIcon';
import TicketIcon from '@icons/TicketIcon';
import { useGetUserQuery } from '@/services/user.service';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import SmallTicket from '@molecules/SmallTicket';
import theme from '@/style/theme';
import { useGetUserTicketsQuery } from '@/services/ticket.service';
import UnHeartIcon from '@/components/icons/unheart';

const SchedulesWrapper = styled.div`
    background: white;
    border-radius: 20px;
`;

const ModeSelector = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.MEDIUM_GRAY};
`;

const ModeBtn = styled.button<{ isSelected: boolean }>`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    gap: 3px;
    align-items: center;
    padding: 0 15px;
    white-space: nowrap;
    color: ${({ isSelected, theme }) => (isSelected ? 'black' : theme.MEDIUM_GRAY)};
    h3 {
        font-weight: 700;
        font-size: 15px;
    }
    /* &:first-child {
        border-right: 0.5px solid ${({ theme }) => theme.MEDIUM_GRAY};
    } */
`;

const ScheduleContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
`;

const NoTickets = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
    svg {
        width: 25px;
        height: 25px;
    }
`;

const MYTICKET_MODE = 1;
const SCHEDULE_MODE = 2;

const FanFeatureBox = () => {
    const [mode, setMode] = useState(MYTICKET_MODE);
    const { data: userData } = useGetUserQuery();
    const { data: myTickets, isLoading: getMyTicketLoading } = useGetUserTicketsQuery(undefined, {
        skip: userData ? false : true,
    });

    const clickModeBtn = useCallback(
        (mode: number) => () => {
            setMode(mode);
        },
        []
    );

    if (getMyTicketLoading) return <></>;

    return (
        <SchedulesWrapper>
            <ModeSelector>
                <ModeBtn onClick={clickModeBtn(MYTICKET_MODE)} isSelected={mode === MYTICKET_MODE}>
                    <TicketIcon stroke={mode === MYTICKET_MODE ? 'black' : theme.MEDIUM_GRAY} />
                    <h3>내가 구매한 티켓</h3>
                </ModeBtn>
                {/* <ModeBtn onClick={clickModeBtn(SCHEDULE_MODE)} isSelected={mode === SCHEDULE_MODE}>
                    <ScheduleIcon fill={mode === SCHEDULE_MODE ? 'black' : theme.MEDIUM_GRAY} />
                    <h3>나의 아티스트 일정</h3>
                </ModeBtn> */}
            </ModeSelector>
            <ScheduleContentsWrapper>
                {mode === MYTICKET_MODE &&
                    (myTickets?.length === 0 ? (
                        <NoTickets>
                            <UnHeartIcon />
                            <span>구매한 티켓이 없습니다</span>
                        </NoTickets>
                    ) : (
                        myTickets?.map((ticket) => (
                            <SmallTicket key={ticket.title} ticket={ticket} />
                        ))
                    ))}
                {/* {mode === SCHEDULE_MODE &&
                    dummySchedules.map((ticket) => (
                        <SmallTicket key={ticket.title} ticket={ticket} isMyTicketMode={false} />
                    ))} */}
            </ScheduleContentsWrapper>
        </SchedulesWrapper>
    );
};

const artist = {
    profileUrl: '',
};

const dummySchedules = [
    { title: '우리 만나요~', startTime: new Date(), artist },
    { title: '두근두근 컴백', startTime: new Date('2022.12.26'), artist },
    { title: '10주년 이벤트❤️', startTime: new Date('2022.12.31'), artist },
];

export default FanFeatureBox;
