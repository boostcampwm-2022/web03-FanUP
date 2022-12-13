import React from 'react';
import styled from 'styled-components';
import { ReducerType } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import ArtistListViewModeSelector from '@molecules/artistListViewModeSelector';
import Artists from '@organisms/artists';
import { useGetAllArtistsQuery } from '@/services/artist.service';
import { useGetSubScribedArtistQuery, useGetUserQuery } from '@/services/user.service';

const ArtistsWrapper = styled.div`
    width: 100%;
    padding: 40px 60px;
`;

const ArtistsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const 나의아티스트 = 2;

const ArtistsBox = () => {
    const mode = useSelector<ReducerType, number>(({ userSlice }) => userSlice.artistListViewMode);
    const { data: userData } = useGetUserQuery();
    const { data: allArtists, isLoading: getAllArtistsLoading } = useGetAllArtistsQuery();
    const { data: subscribedArtist, isLoading: getMyArtistsLoading } = useGetSubScribedArtistQuery(
        undefined,
        {
            skip: mode === 나의아티스트 && userData ? false : true,
        }
    );

    if (getAllArtistsLoading || getMyArtistsLoading) return <></>;

    return (
        <ArtistsWrapper>
            {localStorage.getItem('token') && <ArtistListViewModeSelector />}
            <ArtistsListWrapper>
                <Artists
                    title={mode === 나의아티스트 ? '나의 아티스트' : '아티스트 만나보기'}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    artistList={mode === 나의아티스트 ? subscribedArtist || [] : allArtists!}
                />
            </ArtistsListWrapper>
        </ArtistsWrapper>
    );
};

export default ArtistsBox;
