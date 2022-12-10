import ErrorIcon from '@/components/icons/ErrorIcon';
import React, { ReactNode, ErrorInfo } from 'react';
import styled from 'styled-components';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}
const ErrorWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #9e57ff, #7ed0fa);
    position: relative;
`;

const ContentsWrapper = styled.div`
    color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
    svg {
        width: 70%;
        height: 70%;
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
        background: #9e57ff;
        &:hover {
            background: #7e3be0;
        }
    }
    div {
        line-height: 30px;
    }
`;

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorWrapper>
                    <ContentsWrapper>
                        <ErrorIcon />
                        <h1>에러가 발생했어요</h1>
                        <div>
                            <span>
                                페이지 새로고침으로 해결되지 않는다면, <br />
                                <strong>neostgeart@gmail.com</strong>으로 문의해 주세요
                            </span>
                        </div>
                        <button onClick={() => window.location.reload()}>새로고침</button>
                    </ContentsWrapper>
                </ErrorWrapper>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
