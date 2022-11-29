import React from 'react';
import styled from 'styled-components';
import { dateForm } from '@utils/dateForm';
import ImageChip from '@atoms/ImageChip';
import DDay from '@atoms/D_Day';
import TicketBarCode from '@atoms/TicketBarCode';

const ScheduleTicketWrapper = styled.div`
    border-radius: 10px;
    height: 65px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #f0f0f0;
    white-space: nowrap;
`;

const ScheduleContent = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    width: calc(100% - 9px);
`;

const ScheduleTicketLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 40px;
    height: 100%;
`;

const ScheduleInfo = styled.div`
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    h3 {
        font-size: 15px;
        font-weight: 600;
    }
    span {
        font-size: 12px;
    }
`;

interface Props {
    title: string;
    date: Date;
    thumbNail: string;
}

const ScheduleTicket = ({ title, date, thumbNail }: Props) => {
    return (
        <ScheduleTicketWrapper>
            <TicketBarCode width="9px" height="65px" />
            <ScheduleContent>
                <ScheduleTicketLeft>
                    <ImageChip src={thumbNail} width="50px" height="50px" />
                    <ScheduleInfo>
                        <h3>{title}</h3>
                        <span>{dateForm(date)}</span>
                    </ScheduleInfo>
                </ScheduleTicketLeft>
                <DDay date={date} />
            </ScheduleContent>
        </ScheduleTicketWrapper>
    );
};

export default ScheduleTicket;
