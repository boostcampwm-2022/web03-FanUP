import { ReducerType } from '@/store/rootReducer';
import { FanUpStore } from '@/types/fanUp';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
export function useHandleMyVideo(videoRef: React.RefObject<HTMLVideoElement>) {
    const { myStream } = useSelector<ReducerType, FanUpStore>((state) => state.fanUpSlice);
    useEffect(() => {
        if (!videoRef.current) return;
        if (!myStream) return;
        videoRef.current.srcObject = myStream;
    }, [myStream]);
}
