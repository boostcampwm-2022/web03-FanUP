import NotFoundIcon from '@icons/NotFoundIcon';
import React from 'react';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
    width: 98vw;
    height: 98vh;
    svg {
        width: 100%;
        height: 100%;
    }
`;

const NotFound = () => {
    return (
        <NotFoundWrapper>
            <NotFoundIcon />
        </NotFoundWrapper>
    );
};

export default NotFound;
