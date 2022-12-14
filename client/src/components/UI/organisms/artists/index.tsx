import React from 'react';
import styled from 'styled-components';
import ArtistCard from '@molecules/artistCard';
import { IAritst } from '@/types/artist';
import NoItems from '@atoms/NoItems';

const ArtistsWrapper = styled.div`
    width: 100%;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ArtistListWrapper = styled.div<{ length: number }>`
    display: flex;
    width: 100%;
    flex-flow: wrap;
    gap: 20px;
    margin-bottom: 40px;
`;

interface Props {
    title: string;
    artistList: IAritst[];
}

const Artists = ({ title, artistList }: Props) => {
    return (
        <ArtistsWrapper>
            {artistList?.length === 0 ? (
                <NoItems
                    title="구독한 아티스트가 없습니다 :("
                    width="50px"
                    height="50px"
                    fontSize="30px"
                    padding="40px"
                />
            ) : (
                <>
                    <Title>{title}</Title>
                    <ArtistListWrapper length={artistList?.length}>
                        {artistList?.map((artist, idx) => (
                            <ArtistCard
                                key={artist.name + idx}
                                artist={artist}
                                isMyArtistMode={title === '나의 아티스트'}
                            />
                        ))}
                    </ArtistListWrapper>
                </>
            )}
        </ArtistsWrapper>
    );
};

export default Artists;
