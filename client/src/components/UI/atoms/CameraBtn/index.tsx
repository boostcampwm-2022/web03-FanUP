import React, { useCallback } from 'react';
import CameraOffIcon from '@/components/icons/CameraOffIcon';
import CameraOnIcon from '@/components/icons/CameraOnIcon';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';
import { UserStore } from '@/types/user';

const CameraBtn = () => {
    const { myStream } = useSelector<ReducerType, UserStore>((state) => state.userSlice);
    const [cameraOn, _, toggleCamera] = useToggle(true);

    const onClickCamera = useCallback(() => {
        toggleCamera();
        myStream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }, [myStream]);

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
