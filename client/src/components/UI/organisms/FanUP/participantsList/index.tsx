import Participants from '@/components/UI/atoms/FanUP/Participants';
import React from 'react';
import styled from 'styled-components';

const ParticipantsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const dummyParticipantsList = [
    { nickname: '안병준', isMute: false, isCameraOn: true },
    { nickname: '김성은', isMute: true, isCameraOn: false },
    { nickname: '김진성', isMute: true, isCameraOn: true },
    { nickname: '홍성빈', isMute: false, isCameraOn: false },
];

const ParticipantsList = () => {
    return (
        <ParticipantsListWrapper data-testid="participantsList">
            {dummyParticipantsList.map(({ nickname, isMute, isCameraOn }) => (
                <Participants
                    key={nickname}
                    nickname={nickname}
                    isMute={isMute}
                    isCameraOn={isCameraOn}
                />
            ))}
        </ParticipantsListWrapper>
    );
};

export default ParticipantsList;
