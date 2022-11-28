import React from 'react';
import styled from 'styled-components';
import { ReducerType } from '@store/rootReducer';
import { UserStore } from '@/types/user';
import { useSelector } from 'react-redux';
import ArtistListViewModeSelector from '@molecules/artistListViewModeSelector';
import Artists from '@/components/UI/organisms/artists';

const ArtistsWrapper = styled.div`
    width: 100%;
    padding: 40px 60px;
`;

const 전체 = 0;
const 나의아티스트 = 1;
const 아티스트만나보기 = 2;

const ArtistsBox = () => {
    const { artistListViewMode: mode } = useSelector<ReducerType, UserStore>(
        (state) => state.userSlice
    );
    return (
        <ArtistsWrapper>
            <ArtistListViewModeSelector />
            {(mode === 전체 || mode === 나의아티스트) && (
                <Artists title="나의 아티스트" artistList={dummyArtistList} />
            )}
            {(mode === 전체 || mode === 아티스트만나보기) && (
                <Artists title="아티스트 만나보기" artistList={dummyArtistList} />
            )}
        </ArtistsWrapper>
    );
};

const dummyArtistList = Array.from({ length: 14 }, (_, idx) => {
    return {
        artistName: 'IZ*ONE',
        backgroundThumbnail: `/dummyBackgroundThumbnail${(idx % 2) + 1}.png`,
        logo: '/dummyArtistLogo.png',
    };
});

export default ArtistsBox;
