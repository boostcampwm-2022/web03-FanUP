import { IAritst } from '@/types/artist';
import React from 'react';
import styled from 'styled-components';
import LazyImg from '@atoms/LazyImg';
import DefaultImg from '@atoms/defaultImg';

const ArtistCardWrapper = styled.div`
    cursor: pointer;
    background: white;
    border: 1px solid ${({ theme }) => theme.LIGHT_GRAY};
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    text-align: center;
    padding-bottom: 20px;
    span {
        font-size: 20px;
        font-weight: 700;
    }
    div {
        &:first-child {
            overflow: hidden;
            margin-bottom: 20px;
            img {
            }
        }
    }
    &:hover {
        filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.05));
    }
    &:hover > div:first-child {
        img {
            transform: scale(1.05);
        }
    }
`;

const Logo = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 100%;
    left: 50%;
    bottom: 1.5rem;
    transform: translate(-50%, -50%);
    img {
        border-radius: 100%;
        width: 85%;
        height: 85%;
    }
`;

//height: 150px;
interface Props {
    artist: IAritst;
}

const ArtistCard = ({ artist }: Props) => {
    return (
        <ArtistCardWrapper>
            {artist.profile_url ? (
                <LazyImg src={artist.profile_url} alt="background" width="100%" height="100%" />
            ) : (
                <DefaultImg width="100%" height="100%" borderRadius="8px" />
            )}
            <span>{artist.name}</span>
            <Logo>
                <img src={'/dummyArtistLogo.png'} alt="logo" />
            </Logo>
        </ArtistCardWrapper>
    );
};

export default ArtistCard;
