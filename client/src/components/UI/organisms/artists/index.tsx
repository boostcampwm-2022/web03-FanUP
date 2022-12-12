import React from 'react';
import styled from 'styled-components';
import ArtistCard from '@molecules/artistCard';
import { IAritst } from '@/types/artist';
import NoArtists from '@atoms/NoArtists';

const ArtistsWrapper = styled.div`
    width: 100%;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ArtistListWrapper = styled.div<{ length: number }>`
    display: grid;
    width: 100%;
    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: ${({ length }) =>
        length < 6 ? 'repeat(6, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))'};
    gap: 20px;
    margin-bottom: 40px;
`;

const NoArtistWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
    span {
        font-size: 30px;
        font-weight: 700;
    }
`;

interface Props {
    title: string;
    artistList: IAritst[];
}

const Artists = ({ title, artistList }: Props) => {
    return (
        <ArtistsWrapper>
            {artistList?.length === 0 ? (
                <NoArtistWrapper>
                    <NoArtists />
                </NoArtistWrapper>
            ) : (
                <>
                    <Title>{title}</Title>
                    <ArtistListWrapper length={artistList?.length}>
                        {artistList?.map((artist, idx) => (
                            <ArtistCard key={artist.name + idx} artist={artist} />
                        ))}
                    </ArtistListWrapper>
                </>
            )}
        </ArtistsWrapper>
    );
};

export default Artists;
