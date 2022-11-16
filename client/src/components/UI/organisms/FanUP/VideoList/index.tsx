import MyVideo from '@/components/UI/atoms/FanUP/MyVideo';
import React from 'react';
import styled from 'styled-components';

const VideoListWrapper = styled.div`
    height: 100%;
    max-height: 75vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 15px;
    div {
        background: grey;
        border-radius: 15px;
    }
    video {
        object-fit: fill;
        border-radius: 15px;
        width: 100%;
        height: 100%;
    }
`;

const VideoList = () => {
    return (
        <VideoListWrapper>
            {[1, 2, 3, 4, 5].map((key) => (
                <div key={key}></div>
            ))}
            <MyVideo />
        </VideoListWrapper>
    );
};

export default VideoList;
