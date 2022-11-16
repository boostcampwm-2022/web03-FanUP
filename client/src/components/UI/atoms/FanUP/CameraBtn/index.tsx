import React, { useCallback, useState } from 'react';
import CameraOffIcon from '@/components/icons/cameraOff';
import CameraOnIcon from '@/components/icons/cameraOn';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';
import { FanUpStore } from '@/types/fanUp';

const CameraBtn = () => {
    const { myStream } = useSelector<ReducerType, FanUpStore>((state) => state.fanUpSlice);
    const [cameraOn, _, toggleCamera] = useToggle(true);

    const onClickCamera = useCallback(() => {
        toggleCamera();
        myStream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }, []);

    return (
        <button
            data-testid="cameraBtn"
            onClick={onClickCamera}
            style={{ background: !cameraOn ? theme.PINK : theme.DARK_GRAY }}
        >
            {cameraOn ? <CameraOnIcon fill="#F8F8F8" /> : <CameraOffIcon fill="#F8F8F8" />}
        </button>
    );
};

export default CameraBtn;
