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
    padding-right: 40px;
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
    width: 80%;
    img {
        border-radius: 8px;
    }
    h3 {
        padding: 5px 20px 5px 0;
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
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
    width: 20%;
    align-items: center;
    justify-content: flex-end;
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
        flex-direction: column;
        gap: 3px;
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
                {ticket?.artist?.profileUrl ? (
                    <LazyImg
                        src={ticket?.artist?.profileUrl}
                        alt="thumbnail"
                        width="150px"
                        height="100px"
                    />
                ) : (
                    <DefaultImg width="150px" height="150px" borderRadius="8px" />
                )}
                <h3>{ticket?.artist?.name || 'testArtist'}</h3>
                <span>{ticket.title}</span>
            </TicketLeft>
            <TicketRight>
                <Price>
                    <Fish /> <span>x </span>
                    <strong>{ticket.price}</strong>
                </Price>
                <Time>
                    <div>
                        <section>
                            <strong>팬미팅 시간</strong>
                        </section>
                        <section>
                            <span>{dateForm(ticket.startTime)}</span>
                        </section>
                    </div>
                    <div>
                        <section>
                            <strong>티켓 판매 시간</strong>
                        </section>
                        <section>
                            <span>{dateForm(ticket.salesTime)}</span>
                        </section>
                    </div>
                </Time>
            </TicketRight>
        </AllTicketWrapper>
    );
};

export default AllTicket;
