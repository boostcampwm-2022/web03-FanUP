import ExitIcon from '@/components/icons/exit';
import React from 'react';
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

export default ExitBtn;
