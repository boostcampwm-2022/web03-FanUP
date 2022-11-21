import React from 'react';
import styled from 'styled-components';

const ArtistsWrapper = styled.div`
    padding: 40px 60px;
    h1 {
        font-size: 28px;
        font-weight: 700;
    }
`;

const Artists = () => {
    return (
        <ArtistsWrapper>
            <h1>나의 아티스트</h1>
            <h1>아티스트 만나보기</h1>
        </ArtistsWrapper>
    );
};

export default Artists;
