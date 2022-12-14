import UnHeartIcon from '@/components/icons/unheart';
import React from 'react';
import styled from 'styled-components';

const NoItemsWrapper = styled.div<StyledProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: ${({ padding }) => padding || '40px'};
    span {
        white-space: nowrap;
        font-size: ${({ fontSize }) => fontSize};
        font-weight: 700;
    }
    svg {
        width: ${({ width }) => width};
        height: ${({ height }) => height};
    }
`;

interface StyledProps {
    width: string;
    height: string;
    fontSize: string;
    padding?: string;
}

interface IProps extends StyledProps {
    title: string;
}

const NoItems = (props: IProps) => {
    return (
        <NoItemsWrapper {...props}>
            <UnHeartIcon />
            <span>{props.title}</span>
        </NoItemsWrapper>
    );
};

export default NoItems;
