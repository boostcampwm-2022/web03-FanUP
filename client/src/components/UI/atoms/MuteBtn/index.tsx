import React, { useCallback } from 'react';
import MuteOffIcon from '@/components/icons/MuteOffIcon';
import MuteOnIcon from '@/components/icons/MuteOnIcon';
import theme from '@/style/theme';
import { useToggle } from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';

interface Props {
    peerConnections?: React.MutableRefObject<{
        [key: string]: RTCPeerConnection;
    }>;
}

const MuteBtn = ({ peerConnections }: Props) => {
    const myStream = useSelector<ReducerType, MediaStream | null>(
        ({ userSlice }) => userSlice.myStream
    );
    const [mute, _, toggleMute] = useToggle(false);

    const replaceAudioTrack = () => {
        if (!peerConnections) return;
        const myAudioTrack = myStream?.getAudioTracks()[0];
        Object.keys(peerConnections.current).forEach((key) => {
            const peerConnection = peerConnections.current[key];
            const audioSender = peerConnection.getSenders().find((sender) => {
                return sender.track?.kind === 'audio';
            });
            audioSender?.replaceTrack(myAudioTrack as MediaStreamTrack);
        });
    };

    const onClickMute = useCallback(() => {
        toggleMute();
        myStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
        replaceAudioTrack();
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
