import React from 'react';
import styled from 'styled-components';
import ArtistCard from '@molecules/artistCard';

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ArtistListWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
`;

interface Props {
    title: string;
    artistList: { artistName: string; backgroundThumbnail: string; logo: string }[];
}

const Artists = ({ title, artistList }: Props) => {
    return (
        <div>
            <Title>{title}</Title>
            <ArtistListWrapper>
                {artistList.map(({ artistName, logo, backgroundThumbnail }, idx) => (
                    <ArtistCard
                        key={artistName + idx}
                        artistName={artistName}
                        logo={logo}
                        backgroundThumbnail={backgroundThumbnail}
                    />
                ))}
            </ArtistListWrapper>
        </div>
    );
};

export default Artists;
