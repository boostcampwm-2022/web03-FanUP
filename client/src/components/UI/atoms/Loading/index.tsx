import React from 'react';
import styled, { keyframes } from 'styled-components';

import Fish from '@icons/Fish';

const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

const spinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledLoading = styled.div`
    z-index: 999;
    height: 300px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
    }

    &::after {
        content: '';
        display: block;
        font-size: 10px;
        width: 5em;
        height: 5em;
        animation: ${spinner} 3000ms infinite linear;
        border-radius: 3em;
        box-shadow: #9e57ff 14em 0 0 0, #ab6ffb 10em 10em 0 0, #b481fa 0 14em 0 0,
            #b788f8 -10em 10em 0 0, #c39df8 -14em 0 0 0, #caa9f9 -10em -10em 0 0,
            #dac1fc 0 -14em 0 0, #e0c9ff 10em -10em 0 0;
    }
`;

const StyledLogo = styled.div`
    position: absolute;
    margin-top: 15px;
`;

const Loading = () => {
    return (
        <LoadingWrapper>
            <StyledLoading>
                <StyledLogo>
                    <Fish />
                </StyledLogo>
            </StyledLoading>
        </LoadingWrapper>
    );
};

export default Loading;
