import CameraOffIcon from '@/components/icons/cameraOff';
import CameraOnIcon from '@/components/icons/cameraOn';
import MoreIcon from '@/components/icons/more';
import MuteOffIcon from '@/components/icons/muteOff';
import MuteOnIcon from '@/components/icons/muteOn';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const ParticipantsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;
    background: #f3f3f3;
    border-radius: 8px;
    font-weight: 700;
    button {
        cursor: pointer;
        border: none;
        border-radius: 100%;
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid black !important;
    }
    div {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`;

const NotOpenMore = styled.button`
    background: none;
`;
const OpenMore = styled.button`
    background: black;
    border: 2px solid black !important;
`;

interface Props {
    nickname: string;
    isMute: boolean;
    isCameraOn: boolean;
}

const Participants = ({ nickname, isMute, isCameraOn }: Props) => {
    const [openMore, setOpenMore] = useState(false);
    const clickMore = useCallback(() => {
        setOpenMore((prev) => !prev);
    }, []);
    return (
        <ParticipantsWrapper>
            <div>
                <span>{nickname}</span>
            </div>
            <div>
                {isMute ? <MuteOnIcon fill="#FF6666" /> : <MuteOffIcon fill={'black'} />}
                {isCameraOn ? <CameraOnIcon fill="black" /> : <CameraOffIcon fill="#FF6666" />}
                {openMore ? (
                    <OpenMore data-testid="openMore" onClick={clickMore}>
                        <MoreIcon fill="white" />
                    </OpenMore>
                ) : (
                    <NotOpenMore data-testid="notOpenMore" onClick={clickMore}>
                        <MoreIcon fill="black" />
                    </NotOpenMore>
                )}
            </div>
        </ParticipantsWrapper>
    );
};

export default Participants;
