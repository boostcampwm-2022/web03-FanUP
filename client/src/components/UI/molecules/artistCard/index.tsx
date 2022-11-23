import React from 'react';
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
    height: 150px;
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

interface Props {
    name: string;
    backgroundThumbnail: string;
    logo: string;
}

const ArtistCard = ({ name, backgroundThumbnail, logo }: Props) => {
    return (
        <ArtistCardWrapper>
            <BackgroundThumbNail src={backgroundThumbnail} alt="background" />
            <span>{name}</span>
            <Logo>
                <img src={logo} alt="logo" />
            </Logo>
        </ArtistCardWrapper>
    );
};

export default ArtistCard;
