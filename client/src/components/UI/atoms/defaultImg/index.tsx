import React from 'react';
import styled from 'styled-components';

interface IProps {
    width: string;
    height: string;
    borderRadius: string;
}

const DefaultWrapper = styled.div<IProps>`
    width: ${({ width }) => width};
    padding-bottom: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
    overflow: hidden;
    position: relative;
`;

const Default = styled.div<IProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #9e57ff, #7ed0fa);
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

const DefaultImg = (props: IProps) => {
    return (
        <DefaultWrapper {...props}>
            <Default {...props}>FanUP</Default>
        </DefaultWrapper>
    );
};

export default DefaultImg;
