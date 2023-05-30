import NotFoundIcon from '@icons/NotFoundIcon';
import React from 'react';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #9e57ff, #7ed0fa);
    position: relative;
    div {
        color: white;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
        text-align: center;
        svg {
            width: 75%;
            height: 75%;
        }
        h1 {
            margin-top: -40px;
            font-size: 30px;
            font-weight: 700;
        }
        button {
            cursor: pointer;
            margin-top: 40px;
            font-size: 20px;
            font-weight: 700;
            border: none;
            color: white;
            padding: 10px 25px;
            border-radius: 8px;
            background: ${({ theme }) => theme.PRIMARY};
            &:hover {
                background: ${({ theme }) => theme.PRIMARY_DARK};
            }
        }
    }
`;

const NotFound = () => {
    return (
        <NotFoundWrapper>
            <div>
                <NotFoundIcon />
                <h1>존재하지 않는 페이지입니다</h1>
                <button onClick={() => window.location.replace('/')}>홈으로 이동하기</button>
            </div>
        </NotFoundWrapper>
    );
};

export default NotFound;
