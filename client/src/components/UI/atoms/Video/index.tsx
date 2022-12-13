import React, { useEffect, useRef } from 'react';

const Video = ({ stream, isMyVideo }: { stream: any; isMyVideo: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!videoRef.current) return;
        if (!stream) return;
        videoRef.current.srcObject = stream;
    }, [stream]);
    return (
        <video ref={videoRef} width="100%" height="100%" autoPlay playsInline muted={isMyVideo} />
    );
};

export default Video;
