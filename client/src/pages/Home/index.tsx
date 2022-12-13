import ArtistsBox from '@organisms/artistsBox';
import FanFeatureBox from '@/components/UI/organisms/FanFeatureBox';
import Header from '@/components/UI/organisms/header';
import React from 'react';
import styled from 'styled-components';
import SubLogo from '@/components/icons/SubLogo';
import { useGetUserQuery } from '@/services/user.service';
import withGetUser from '@/components/hoc/withGetUser';

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

const UserContentsWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px 30px;
`;

const Home = () => {
    const { data: userData } = useGetUserQuery();

    return (
        <>
            <Header />
            <BannerWrapper>
                <SubLogo />
                <h1>No Fan, No Artist</h1>
            </BannerWrapper>
            <UserContentsWrapper>
                {userData ? <FanFeatureBox /> : <div></div>}
                <ArtistsBox />
            </UserContentsWrapper>
        </>
    );
};

export default withGetUser(Home);
