import { dateForm } from '@utils/dateForm';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@atoms/Button';
import theme from '@style/theme';
import { Ticket } from '@/types/ticket';
import { useNavigate } from 'react-router-dom';

const AllTicketWrapper = styled.div`
    cursor: pointer;
    width: 100%;
    background: white;
    border: 1px solid rgb(0 0 0 / 16%);
    box-shadow: 2px 2px 4px rgb(0 0 0 / 16%);
    border-radius: 14px;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        transition-duration: 0.3s;
        transform: translateY(-6px) translateX(-3px);
        box-shadow: 0 3px 5px 3px rgb(0 0 0 / 8%);
    }
`;

const TicketLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    img {
        width: 150px;
        height: 75px;
        border-radius: 8px;
    }
    h3 {
        padding: 5px 20px 5px 0;
        //padding-right: 20px;
        font-size: 20px;
        font-weight: 700;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-right: 1px solid ${({ theme }) => theme.DARK_GRAY};
    }
    span {
        font-size: 15px;
        width: 150px;
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
    gap: 5px;
    font-weight: 700;
`;

interface Props {
    ticket: Ticket;
}

const AllTicket = ({ ticket }: Props) => {
    const navigate = useNavigate();

    const gotoTicket = useCallback(() => {
        navigate(`/ticket/${ticket.id}`);
    }, [navigate, ticket]);

    return (
        <AllTicketWrapper onClick={gotoTicket}>
            <TicketLeft>
                <img src="/dummyBackgroundThumbnail2.png" alt="thumbnail" />
                <h3>{ticket.name}</h3>
                <span>{ticket.description}</span>
            </TicketLeft>
            <TicketRight>
                <Price>
                    <img src="/signature.png" /> <span>x </span>
                    <strong>10</strong>
                </Price>
                <Time>
                    <span>{dateForm(ticket.date)}</span>
                    <span>{ticket.time}</span>
                </Time>
                <Button
                    padding="10px 20px"
                    borderRadius="8px"
                    fontSize="15px"
                    color="white"
                    backgroundColor={theme.PRIMARY}
                    content="함께하기"
                    onClick={gotoTicket}
                />
            </TicketRight>
        </AllTicketWrapper>
    );
};

export default AllTicket;
