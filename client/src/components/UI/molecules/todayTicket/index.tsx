import { dateForm } from '@/utils/dateForm';
import React from 'react';
import styled from 'styled-components';
import { StringLiteral } from 'typescript';
import TicketBarCode from '../../atoms/TicketBarCode';

const TodayTicketWrapper = styled.div`
    cursor: pointer;
    border-radius: 14px;
    display: flex;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.12);
`;

const Contents = styled.div`
    display: flex;
    background: white;
`;

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    //padding-right: 20px;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface Props {
    ticket: {
        date: Date;
        time: string;
        description: string;
        name: string;
        price: number;
    };
}

const TodayTicket = ({ ticket }: Props) => {
    return (
        <TodayTicketWrapper>
            <TicketBarCode width="20px" />
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
