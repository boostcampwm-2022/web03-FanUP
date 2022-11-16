import React, { useCallback, useState } from 'react';
import CameraOffIcon from '@/components/icons/cameraOff';
import CameraOnIcon from '@/components/icons/cameraOn';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';

const CameraBtn = () => {
    const [cameraOn, _, onClickCamera] = useToggle(true);

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
