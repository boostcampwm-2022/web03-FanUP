import React from 'react';
import styled from 'styled-components';
import { ReducerType } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import ArtistListViewModeSelector from '@molecules/artistListViewModeSelector';
import Artists from '@organisms/artists';
import { DummyAllArtists, DummyMyArtists } from '@utils/dummy';

const ArtistsWrapper = styled.div`
    width: 100%;
    padding: 40px 60px;
`;

const ArtistsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const 전체 = 0;
const 나의아티스트 = 1;
const 아티스트만나보기 = 2;

const ArtistsBox = () => {
    const mode = useSelector<ReducerType, number>(({ userSlice }) => userSlice.artistListViewMode);

    return (
        <ArtistsWrapper>
            <ArtistListViewModeSelector />
            <ArtistsListWrapper>
                {(mode === 전체 || mode === 나의아티스트) && (
                    <Artists title="나의 아티스트" artistList={DummyMyArtists} />
                )}
                {(mode === 전체 || mode === 아티스트만나보기) && (
                    <Artists title="아티스트 만나보기" artistList={DummyAllArtists} />
                )}
            </ArtistsListWrapper>
        </ArtistsWrapper>
    );
};

export default ArtistsBox;
