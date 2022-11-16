import React, { useCallback, useState } from 'react';
import MuteOffIcon from '@/components/icons/muteOff';
import MuteOnIcon from '@/components/icons/muteOn';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';
const MuteBtn = () => {
    const [mute, _, onClickMute] = useToggle(false);

    return (
        <button
            data-testid="muteBtn"
            onClick={onClickMute}
            style={{ background: mute ? theme.PINK : theme.DARK_GRAY }}
        >
            {mute ? <MuteOnIcon fill="#F8F8F8" /> : <MuteOffIcon fill="#F8F8F8" />}
        </button>
    );
};

export default MuteBtn;
