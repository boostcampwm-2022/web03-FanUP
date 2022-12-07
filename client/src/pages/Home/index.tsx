import ArtistsBox from '@organisms/artistsBox';
import Calendar from '@organisms/calendar';
import Schedules from '@organisms/schedules';
import Header from '@/components/UI/organisms/header';
import React from 'react';
import styled from 'styled-components';
import useSearchParams from '@hooks/useSearchParams';
import SubLogo from '@/components/icons/SubLogo';

const BannerWrapper = styled.div`
    background: linear-gradient(to right, #9e57ff, #7ed0fa);
    width: 100%;
    height: 300px;
    padding: 32px;
    display: flex;
    gap: 25px;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 75px;
        color: white;
        font-weight: 700;
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
                        <SubLogo />
                        <h1>No Fan, No Artist</h1>
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
