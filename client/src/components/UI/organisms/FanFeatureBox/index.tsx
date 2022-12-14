import TicketIcon from '@icons/TicketIcon';
import { useGetUserQuery } from '@/services/user.service';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SmallTicket from '@molecules/SmallTicket';
import theme from '@/style/theme';
import { useGetUserTicketsQuery } from '@/services/ticket.service';
import NoItems from '@atoms/NoItems';

const SchedulesWrapper = styled.div`
    background: white;
    border-radius: 20px;
    padding: 40px;
    height: fit-content;
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

const MYTICKET_MODE = 1;

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
                        <NoItems
                            title="구매한 티켓이 없습니다"
                            width="20px"
                            height="20px"
                            fontSize="12px"
                            padding="20px"
                        />
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

export default FanFeatureBox;
