import { ReducerType } from '@/store/rootReducer';
import { UserStore } from '@/types/user';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MyVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { myStream } = useSelector<ReducerType, UserStore>((state) => state.userSlice);
    useEffect(() => {
        if (!videoRef.current) return;
        if (!myStream) return;
        videoRef.current.srcObject = myStream;
    }, [myStream]);
    return <video ref={videoRef} width="100%" height="100%" autoPlay playsInline></video>;
};

export default MyVideo;
