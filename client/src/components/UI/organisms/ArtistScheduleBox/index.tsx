import ScheduleIcon from '@/components/icons/ScheduleIcon';
import React from 'react';
import styled from 'styled-components';
import SmallTicket from '@molecules/SmallTicket';
import { useGetArtistTodayTicketQuery } from '@/services/ticket.service';

const SchedulesWrapper = styled.div`
    background: white;
    border-radius: 8px;
    padding: 40px;
    height: fit-content;
`;

const ModeSelector = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.MEDIUM_GRAY};
`;

const ModeBtn = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    gap: 3px;
    align-items: center;
    white-space: nowrap;
    color: black;
    h3 {
        font-weight: 700;
        font-size: 15px;
    }
`;

const ScheduleContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
`;

const ArtistScheduleBox = () => {
    const { data: artistTicket, isLoading } = useGetArtistTodayTicketQuery();
    if (isLoading) return <></>;

    return (
        <SchedulesWrapper>
            <ModeSelector>
                <ModeBtn>
                    <ScheduleIcon fill="black" />
                    <h3>오늘의 FanUP</h3>
                </ModeBtn>
            </ModeSelector>
            <ScheduleContentsWrapper>
                {artistTicket && artistTicket?.length === 0 && (
                    <span>오늘 진행 예정인 FanUP이 없습니다.</span>
                )}
                {artistTicket &&
                    artistTicket?.length !== 0 &&
                    artistTicket.map((ticket) => (
                        <SmallTicket key={ticket.title} ticket={ticket} />
                    ))}
            </ScheduleContentsWrapper>
        </SchedulesWrapper>
    );
};
export default ArtistScheduleBox;
