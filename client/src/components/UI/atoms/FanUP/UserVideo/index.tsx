import React, { useEffect, useRef } from 'react';

const UserVideo = ({ stream }: { stream: any }) => {
    const userVideoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!userVideoRef.current) return;
        if (!stream) return;
        userVideoRef.current.srcObject = stream;
    }, [stream]);
    return <video ref={userVideoRef} width="100%" height="100%" autoPlay playsInline />;
};

export default UserVideo;
