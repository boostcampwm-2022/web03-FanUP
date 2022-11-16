import Header from '@/components/UI/layout/header';
import React from 'react';
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

const Home = () => {
    return (
        <>
            <Header />
            <BannerWrapper>
                <img src="/banner.png" alt="banner" />
            </BannerWrapper>
        </>
    );
};

export default Home;
