import { dateForm } from '@utils/dateForm';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { TicketSales } from '@/types/ticket';
import { useNavigate } from 'react-router-dom';
import Fish from '@icons/Fish';
import LazyImg from '@atoms/LazyImg';
import DefaultImg from '@atoms/defaultImg';

const AllTicketWrapper = styled.div`
    cursor: pointer;
    width: 100%;
    background: white;
    border: 1px solid rgb(0 0 0 / 16%);
    box-shadow: 2px 2px 4px rgb(0 0 0 / 16%);
    border-radius: 14px;
    padding: 15px 10px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        transition-duration: 0.3s;
        transform: translateY(-6px) translateX(-3px);
        box-shadow: 0 3px 5px 3px rgb(0 0 0 / 8%);
    }
    svg {
        width: 25px;
        height: 25px;
    }
`;

const TicketLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    img {
        border-radius: 8px;
    }
    h3 {
        padding: 5px 20px 5px 0;
        font-size: 20px;
        font-weight: 700;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-right: 1px solid ${({ theme }) => theme.DARK_GRAY};
    }
    span {
        color: ${({ theme }) => theme.DARK_GRAY};
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
const TicketRight = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Price = styled.div`
    padding: 5px 20px 5px 0;
    display: flex;
    align-items: center;
    font-size: 15px;
    gap: 5px;
    border-right: 1px solid ${({ theme }) => theme.DARK_GRAY};

    strong {
        font-weight: 700;
    }
`;

const Time = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }
    strong {
        font-weight: 700;
    }
    span {
        color: ${({ theme }) => theme.DARK_GRAY};
    }
`;

interface Props {
    ticket: TicketSales;
}

const AllTicket = ({ ticket }: Props) => {
    const navigate = useNavigate();

    const gotoTicket = useCallback(() => {
        navigate(`/ticket/${ticket.id}`);
    }, [navigate, ticket]);

    return (
        <AllTicketWrapper data-testid="allTicket" onClick={gotoTicket}>
            <TicketLeft>
                {ticket.profileUrl ? (
                    <LazyImg src={ticket.profileUrl} alt="thumbnail" width="150px" height="100px" />
                ) : (
                    <DefaultImg width="150px" height="150px" borderRadius="8px" />
                )}
                <h3>{ticket?.name || 'testArtist'}</h3>
                <span>{ticket.title}</span>
            </TicketLeft>
            <TicketRight>
                <Price>
                    <Fish /> <span>x </span>
                    <strong>10</strong>
                </Price>
                <Time>
                    <div>
                        <strong>팬미팅 시간</strong> <span>{dateForm(ticket.startTime)}</span>
                    </div>
                    <div>
                        <strong>티켓 판매 시간</strong> <span>{dateForm(ticket.salesTime)}</span>
                    </div>
                </Time>
            </TicketRight>
        </AllTicketWrapper>
    );
};

export default AllTicket;
