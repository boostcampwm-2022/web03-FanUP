import React, { useCallback, useState } from 'react';
import MuteOffIcon from '@/components/icons/muteOff';
import MuteOnIcon from '@/components/icons/muteOn';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';
import { FanUpStore } from '@/types/fanUp';
const MuteBtn = () => {
    const { myStream } = useSelector<ReducerType, FanUpStore>((state) => state.fanUpSlice);
    const [mute, _, toggleMute] = useToggle(false);

    const onClickMute = useCallback(() => {
        toggleMute();
        myStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }, [myStream]);

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
