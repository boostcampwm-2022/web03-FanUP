import ScheduleIcon from '@/components/icons/ScheduleIcon';
import React from 'react';
import styled from 'styled-components';
import SmallTicket from '@molecules/SmallTicket';

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
    return (
        <SchedulesWrapper>
            <ModeSelector>
                <ModeBtn>
                    <ScheduleIcon fill="black" />
                    <h3>오늘의 FanUP</h3>
                </ModeBtn>
            </ModeSelector>
            <ScheduleContentsWrapper>
                {dummyMyTickets.map((ticket) => (
                    <SmallTicket key={ticket.title} ticket={ticket} isMyTicketMode={true} />
                ))}
            </ScheduleContentsWrapper>
        </SchedulesWrapper>
    );
};

const dummyMyTickets = [
    { title: '부스트캠프 수료식', startTime: new Date(), profileUrl: '' },
    { title: '엔믹스 1주년❤️', startTime: new Date('2022.12.21'), profileUrl: '' },
    { title: '뉴진스 1주년❤️', startTime: new Date('2022.12.25'), profileUrl: '' },
];

export default ArtistScheduleBox;
