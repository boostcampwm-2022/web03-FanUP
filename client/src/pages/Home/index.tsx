import Header from '@/components/UI/layout/header';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BannerWrapper = styled.div`
    background: black;
    width: 100%;
    padding: 32px;
    display: flex;
    justify-content: center;
    img {
        margin: 0 auto;
    }
`;

const TicketForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Home = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/FanUP/${inputRef.current?.value}`);
    };
    return (
        <>
            <Header />
            <BannerWrapper>
                <img src="/banner.png" alt="banner" />
            </BannerWrapper>
            <TicketForm onSubmit={onSubmit}>
                <div>
                    <label>티켓번호 입력</label>
                    <input ref={inputRef} />
                </div>
                <button>입력</button>
            </TicketForm>
        </>
    );
};

export default Home;
