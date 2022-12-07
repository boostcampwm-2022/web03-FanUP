import ExitIcon from '@icons/ExitIcon';
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ExitBtnWrapper = styled.button`
    background: ${({ theme }) => theme.PINK};
`;

const ExitBtn = () => {
    const navigate = useNavigate();
    const exit = useCallback(() => {
        navigate('/');
    }, []);
    return (
        <ExitBtnWrapper data-testid="exitBtn" onClick={exit}>
            <ExitIcon fill="white" />
        </ExitBtnWrapper>
    );
};

export default memo(ExitBtn);
