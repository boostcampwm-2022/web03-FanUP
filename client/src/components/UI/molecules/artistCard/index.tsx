import { IAritst } from '@/types/artist';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import LazyImg from '@atoms/LazyImg';
import DefaultImg from '@atoms/defaultImg';
import SubscribeBtn from '@atoms/SubscribeBtn';

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
        div {
            transform: scale(1.05);
        }
    }
`;

//height: 150px;
interface Props {
    artist: IAritst;
}

const ArtistCard = ({ artist }: Props) => {
    const gotoArtistPage = useCallback(() => {
        alert('아티스트 개인 페이지는 준비중입니다 :(');
    }, []);

    return (
        <ArtistCardWrapper onClick={gotoArtistPage}>
            {artist.profileUrl ? (
                <LazyImg src={artist.profileUrl} alt="background" width="100%" height="100%" />
            ) : (
                <DefaultImg width="100%" height="100%" borderRadius="8px" />
            )}
            <span>{artist.name}</span>
            <SubscribeBtn isSubscribe={artist?.isFavorite ? true : false} artistId={artist.id} />
        </ArtistCardWrapper>
    );
};

export default ArtistCard;
