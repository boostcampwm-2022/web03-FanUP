import React from 'react';
import styled from 'styled-components';
import { dateForm } from '@utils/dateForm';
import ImageChip from '@atoms/ImageChip';
import DDayChip from '@atoms/DDayChip';

const ScheduleCardWrapper = styled.div`
    padding: 9px 14px;
    border-radius: 10px;
    background: ${({ theme }) => theme.LIGHT_GRAY};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const ScheduleCardLeft = styled.div`
    display: flex;
    gap: 10px;
    margin-right: 40px;
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        h3 {
            font-size: 15px;
            font-weight: 600;
        }
        span {
            font-size: 12px;
        }
    }
`;

interface Props {
    title: string;
    date: Date;
    thumbNail: string;
}

const ScheduleCard = ({ title, date, thumbNail }: Props) => {
    return (
        <ScheduleCardWrapper>
            <ScheduleCardLeft>
                <ImageChip src={thumbNail} width="50px" height="50px" />
                <div>
                    <h3>{title}</h3>
                    <span>{dateForm(date)}</span>
                </div>
            </ScheduleCardLeft>
            <DDayChip date={date} width="50px" height="50px" />
        </ScheduleCardWrapper>
    );
};

export default ScheduleCard;
