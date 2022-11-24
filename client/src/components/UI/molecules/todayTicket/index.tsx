import { Ticket } from '@/types/ticket';
import { dateForm } from '@utils/dateForm';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TicketBarCode from '@atoms/TicketBarCode';

const TodayTicketWrapper = styled.div`
    cursor: pointer;
    white-space: nowrap;
    height: 220px;
    width: fit-content;
    border-radius: 14px;
    display: flex;
    margin-right: 20px;
    background: white;
    padding-right: 20px;
    border: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    overflow: hidden;
`;

const Contents = styled.div`
    display: flex;
    background: white;
`;

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    margin-right: 0px;
    padding-right: 20px;
    border-right: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    h2 {
        font-size: 17px;
        margin-bottom: 10px;
        font-weight: 600;
    }
    span {
        font-size: 15px;
        font-weight: 600;
    }
`;

const Price = styled.div`
    background: ${({ theme }) => theme.MEDIUM_GRAY};
    border-radius: 6px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-size: 15px;
    gap: 5px;
`;

const RightContent = styled.div`
    padding: 20px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface Props {
    ticket: Ticket;
}

const TodayTicket = ({ ticket }: Props) => {
    const navigate = useNavigate();

    const gotoTicket = useCallback(() => {
        navigate(`/ticket/${ticket.id}`);
    }, [navigate, ticket]);

    return (
        <TodayTicketWrapper onClick={gotoTicket}>
            <TicketBarCode width="20px" height="220px" />
            <Contents>
                <LeftContent>
                    <div>
                        <div>
                            <h2>OPEN</h2>
                        </div>
                        <div>
                            <span>{dateForm(ticket.date)}</span>
                        </div>
                        <div>
                            <span>{ticket.time}</span>
                        </div>
                    </div>
                    <Price>
                        <img src="/signature.png" /> <span>x </span>
                        <strong>10</strong>
                    </Price>
                </LeftContent>
                <RightContent>
                    <img src="/dummyBackgroundThumbnail2.png" alt="thumbnail" />
                    <span>
                        <strong>{ticket.name}</strong>
                    </span>
                    <span>{ticket.description}</span>
                </RightContent>
            </Contents>
        </TodayTicketWrapper>
    );
};

export default TodayTicket;
