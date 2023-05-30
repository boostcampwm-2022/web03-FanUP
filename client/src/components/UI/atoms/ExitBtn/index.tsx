import ExitIcon from '@icons/ExitIcon';
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const ExitBtnWrapper = styled.button`
    background: ${({ theme }) => theme.PINK};
`;

const ExitBtn = () => {
    const exit = useCallback(() => {
        if (!window.confirm('나가시겠습니까?')) return;
        window.location.replace('/');
    }, []);
    return (
        <ExitBtnWrapper data-testid="exitBtn" onClick={exit}>
            <ExitIcon fill="white" />
        </ExitBtnWrapper>
    );
};

export default memo(ExitBtn);
