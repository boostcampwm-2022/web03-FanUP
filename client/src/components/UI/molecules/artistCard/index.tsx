import { IAritst } from '@/types/artist';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LazyImg from '@atoms/LazyImg';

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

const BackgroundThumbNail = styled.img`
    width: 100%;
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    margin-bottom: 20px;
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
    bottom: 5%;
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
            <LazyImg src={artist.profile_url} alt="background" width="100%" height="100%" />
            <span>{artist.name}</span>
            <Logo>
                <img src={'/dummyArtistLogo.png'} alt="logo" />
            </Logo>
        </ArtistCardWrapper>
    );
};

export default ArtistCard;
