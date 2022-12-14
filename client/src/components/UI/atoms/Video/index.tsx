import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const VideoWrapper = styled.div`
    position: relative;
    div {
        padding: 10px 20px;
        border-radius: 8px;
        position: absolute;
        bottom: 5px;
        left: 5px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        background: rgba(0, 0, 0, 0.4) !important;
    }
`;

const Video = ({
    stream,
    isMyVideo,
    nickname,
}: {
    stream: MediaStream | null;
    isMyVideo: boolean;
    nickname: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        if (!stream) return;
        videoRef.current.srcObject = stream;
    }, [stream]);

    return (
        <VideoWrapper>
            <video
                ref={videoRef}
                width="100%"
                height="100%"
                autoPlay
                playsInline
                muted={isMyVideo}
            />
            <div>
                <span>{nickname}</span>
            </div>
        </VideoWrapper>
    );
};

export default Video;
