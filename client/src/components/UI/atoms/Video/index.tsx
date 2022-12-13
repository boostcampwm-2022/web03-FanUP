import React, { useEffect, useRef } from 'react';

const Video = ({ stream }: { stream: any }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!videoRef.current) return;
        if (!stream) return;
        videoRef.current.srcObject = stream;
    }, [stream]);
    return <video ref={videoRef} width="100%" height="100%" autoPlay playsInline muted />;
};

export default Video;
