import { get_D_Day, isDDay } from '@/utils/get_D_Day';
import React from 'react';
import styled from 'styled-components';

const DDayWrapper = styled.div<{ isDDay: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-weight: 700;
    color: ${({ isDDay, theme }) => isDDay && theme.PINK};
    border-left: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    padding-left: 10px;
`;

interface Props {
    date: Date;
}

const DDay = ({ date }: Props) => {
    return (
        <DDayWrapper isDDay={isDDay(date)}>
            <span>{get_D_Day(date)}</span>
        </DDayWrapper>
    );
};

export default DDay;
