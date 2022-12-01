import ArtistsBox from '@organisms/artistsBox';
import Calendar from '@organisms/calendar';
import Schedules from '@organisms/schedules';
import Header from '@/components/UI/organisms/header';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LazyImg from '@atoms/LazyImg';
import useSearchParams from '@hooks/useSearchParams';

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

const ArtistCalendarWrapper = styled.div`
    background: ${({ theme }) => theme.LIGHT_GRAY};
    width: 100%;
    height: calc(100vh - 75px);
    padding: 40px 0;
`;

const UserContentsWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px 30px;
`;

const Home = () => {
    const { isArtist } = useSearchParams();

    //const [isArtist, setIsArtist] = useState(false);

    return (
        <>
            <Header />
            {isArtist === '1' ? (
                <ArtistCalendarWrapper>
                    <Calendar />
                </ArtistCalendarWrapper>
            ) : (
                <>
                    <BannerWrapper>
                        <LazyImg src="/banner.png" alt="banner" width="620px" height="237px" />
                    </BannerWrapper>
                    <UserContentsWrapper>
                        <Schedules />
                        <ArtistsBox />
                    </UserContentsWrapper>
                </>
            )}
        </>
    );
};

export default Home;
