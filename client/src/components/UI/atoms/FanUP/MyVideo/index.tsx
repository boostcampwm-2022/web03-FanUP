import { useHandleMyVideo } from '@/hooks/useHandleMyVideo';
import { useMyStream } from '@/hooks/useMyStream';
import React, { useRef } from 'react';

const MyVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useMyStream();
    useHandleMyVideo(videoRef);
    return <video ref={videoRef} width="100%" height="100%" autoPlay playsInline></video>;
};

export default MyVideo;
