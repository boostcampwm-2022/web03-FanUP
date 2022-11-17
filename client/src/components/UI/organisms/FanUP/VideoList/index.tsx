import MyVideo from '@/components/UI/atoms/FanUP/MyVideo';
import UserVideo from '@/components/UI/atoms/FanUP/UserVideo';
import React from 'react';
import styled from 'styled-components';

const VideoListWrapper = styled.div`
    height: 100%;
    max-height: 75vh;
    display: grid;
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

interface Props {
    userStream: any[];
}

const VideoList = ({ userStream }: Props) => {
    return (
        <VideoListWrapper style={gridTemplate[String(userStream.length)]}>
            {userStream.map((data, idx) => (
                <UserVideo stream={data.stream} key={idx} />
            ))}
            <MyVideo />
        </VideoListWrapper>
    );
};

const gridTemplate: { [key: string]: { gridTemplateColumns: string; gridTemplateRows: string } } = {
    '0': { gridTemplateColumns: 'repeat(1,1fr)', gridTemplateRows: 'repeat(1,100%)' },
    '1': { gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(1,100%)' },
    '2': { gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(1,100%)' },
    '3': { gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(2,50%)' },
    '4': { gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,50%)' },
    '5': { gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,50%)' },
};

export default VideoList;
