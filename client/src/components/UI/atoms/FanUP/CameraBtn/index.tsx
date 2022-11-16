import React, { useCallback, useState } from 'react';
import CameraOffIcon from '@/components/icons/cameraOff';
import CameraOnIcon from '@/components/icons/cameraOn';
import theme from '@/style/theme';

const CameraBtn = () => {
    const [cameraOn, setCameraOn] = useState(true);
    const onClickCamera = useCallback(() => {
        setCameraOn((prev) => !prev);
    }, []);
    return (
        <button
            onClick={onClickCamera}
            style={{ background: !cameraOn ? theme.PINK : theme.DARK_GRAY }}
        >
            {cameraOn ? <CameraOnIcon fill="#F8F8F8" /> : <CameraOffIcon fill="#F8F8F8" />}
        </button>
    );
};

export default CameraBtn;
