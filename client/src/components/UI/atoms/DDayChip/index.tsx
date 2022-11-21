import { get_D_Day, isDDay } from '@/utils/get_D_Day';
import React from 'react';
import styled from 'styled-components';

const DDayChipWrapper = styled.div<{ width: string; height: string; isDDay: boolean }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    font-weight: 700;
    background: ${({ isDDay }) => isDDay && '#FFAAAA'};
    color: ${({ isDDay }) => isDDay && 'white'};
`;

interface Props {
    date: Date;
    width: string;
    height: string;
}

const DDayChip = ({ date, width, height }: Props) => {
    return (
        <DDayChipWrapper width={width} height={height} isDDay={isDDay(date)}>
            <span>{get_D_Day(date)}</span>
        </DDayChipWrapper>
    );
};

export default DDayChip;
