import { Ticket, TicketSales } from '@/types/ticket';
import { dateForm, getDate, getTime } from '@utils/dateForm';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TicketBarCode from '@atoms/TicketBarCode';
import Fish from '@icons/Fish';
import DefaultImg from '@atoms/defaultImg';

const TodayTicketWrapper = styled.div`
    cursor: pointer;
    white-space: nowrap;
    height: 220px;
    width: fit-content;
    border-radius: 14px;
    display: flex;
    //margin-right: 20px;
    background: white;
    padding-right: 20px;
    border: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    overflow: hidden;
    svg {
        width: 25px;
        height: 25px;
    }
`;

const Contents = styled.div`
    display: flex;
    background: white;
`;

const LeftContent = styled.div`
    width: 95px;
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

const Time = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    h2 {
        margin-bottom: 2px;
    }
`;

const Price = styled.div`
    background: ${({ theme }) => theme.MEDIUM_GRAY};
    border-radius: 6px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    gap: 3px;
`;

const RightContent = styled.div`
    width: 200px;
    padding: 20px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    img {
        width: 160px;
        height: 100px;
    }
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    strong {
        font-weight: 700;
    }
`;

interface Props {
    ticket: TicketSales;
}

const TodayTicket = ({ ticket }: Props) => {
    const navigate = useNavigate();

    const gotoTicket = useCallback(() => {
        navigate(`/ticket/${ticket.id}`);
    }, [navigate, ticket]);

    return (
        <TodayTicketWrapper data-testid="todayTicket" onClick={gotoTicket}>
            <TicketBarCode width="20px" height="220px" />
            <Contents>
                <LeftContent>
                    <Time>
                        <h2>티켓팅</h2>
                        <div>
                            <span>{getDate(ticket.salesTime)}</span>
                            <br />
                            <span>{getTime(ticket.salesTime)}</span>
                        </div>
                    </Time>
                    <Time>
                        <h2>FanUP</h2>
                        <div>
                            <span>{getDate(ticket.startTime)}</span>
                            <br />
                            <span>{getTime(ticket.startTime)}</span>
                        </div>
                    </Time>
                    <Price>
                        <Fish /> <span>x</span>
                        <strong>{ticket.price}</strong>
                    </Price>
                </LeftContent>
                <RightContent>
                    {ticket?.artist?.profileUrl ? (
                        <img src={ticket?.artist?.profileUrl} alt="profile" />
                    ) : (
                        <DefaultImg width="160px" height="100px" borderRadius="8px" />
                    )}
                    {/* <DefaultImg width="160px" height="100px" borderRadius="8px" /> */}
                    <span>
                        <strong>{ticket.artist.name}</strong>
                    </span>
                    <span>{ticket.title}</span>
                </RightContent>
            </Contents>
        </TodayTicketWrapper>
    );
};

export default TodayTicket;
