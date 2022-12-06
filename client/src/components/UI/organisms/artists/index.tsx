import React from 'react';
import styled from 'styled-components';
import ArtistCard from '@molecules/artistCard';
import { IAritst } from '@/types/artist';

const ArtistsWrapper = styled.div`
    width: 100%;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ArtistListWrapper = styled.div`
    display: grid;
    width: 100%;
    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
            <Title>{title}</Title>
            <ArtistListWrapper>
                {artistList.map((artist, idx) => (
                    <ArtistCard key={artist.name + idx} artist={artist} />
                ))}
            </ArtistListWrapper>
        </ArtistsWrapper>
    );
};

export default Artists;
