import React from 'react';
import styled from 'styled-components';

interface IProps {
    width: string;
    height: string;
    borderRadius: string;
}

const Default = styled.div<IProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
    background: ${({ theme }) => theme.PRIMARY};
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

const DefaultImg = (props: IProps) => {
    return <Default {...props}>FanUP</Default>;
};

export default DefaultImg;
