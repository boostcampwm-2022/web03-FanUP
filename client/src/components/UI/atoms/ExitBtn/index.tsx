import ExitIcon from '@icons/ExitIcon';
import React, { memo } from 'react';
import styled from 'styled-components';

const ExitBtnWrapper = styled.button`
    background: ${({ theme }) => theme.PINK};
`;

const ExitBtn = () => {
    return (
        <ExitBtnWrapper data-testid="exitBtn">
            <ExitIcon />
        </ExitBtnWrapper>
    );
};

export default memo(ExitBtn);
