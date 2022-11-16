import React from 'react';
import styled from 'styled-components';

const VideoListWrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 15px;
    div {
        background: grey;
        border-radius: 15px;
    }
`;

const VideoList = () => {
    return (
        <VideoListWrapper>
            {[1, 2, 3, 4, 5, 6].map((key) => (
                <div key={key}></div>
            ))}
        </VideoListWrapper>
    );
};

export default VideoList;
