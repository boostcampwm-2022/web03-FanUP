import { IAritst } from '@/types/artist';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

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
    &:hover {
        filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.05));
    }
    &:hover > img {
        transform: scale(1.05);
    }
`;

const BackgroundThumbNail = styled.img`
    width: 100%;
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    margin-bottom: 20px;
    transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
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
    bottom: 30px;
    transform: translate(-50%, -50%);
    img {
        border-radius: 100%;
        width: 35px;
        height: 35px;
    }
`;

//height: 150px;
interface Props {
    artist: IAritst;
}

const ArtistCard = ({ artist }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const observerCallback = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLImageElement;
                    target.src = target.dataset.src as string;
                    observer.unobserve(entry.target);
                }
            });
        },
        []
    );

    useEffect(() => {
        if (!imgRef.current) return;
        const observer = new IntersectionObserver(observerCallback, {});
        observer.observe(imgRef.current);
    }, []);

    return (
        <ArtistCardWrapper>
            <BackgroundThumbNail ref={imgRef} data-src={artist.profile_url} alt="background" />
            <span>{artist.name}</span>
            <Logo>
                <img src={'/dummyArtistLogo.png'} alt="logo" />
            </Logo>
        </ArtistCardWrapper>
    );
};

export default ArtistCard;
