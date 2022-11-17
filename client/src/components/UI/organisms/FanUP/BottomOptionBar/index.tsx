import React from 'react';
import CameraBtn from '@/components/UI/atoms/FanUP/CameraBtn';
import ExitBtn from '@/components/UI/atoms/FanUP/ExitBtn';
import MuteBtn from '@/components/UI/atoms/FanUP/MuteBtn';
import styled from 'styled-components';

const BottomOptionBarWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    background: white;
    box-shadow: 3px 3px 40px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    button {
        border-radius: 100%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }
`;
interface Props {
    peerConnections?: React.MutableRefObject<{
        [key: string]: RTCPeerConnection;
    }>;
}

const BottomOptionBar = ({ peerConnections }: Props) => {
    return (
        <BottomOptionBarWrapper>
            <div>
                <MuteBtn peerConnections={peerConnections} />
                <CameraBtn />
            </div>
            <ExitBtn />
        </BottomOptionBarWrapper>
    );
};

export default BottomOptionBar;
