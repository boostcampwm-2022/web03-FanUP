import Participants from '@/components/UI/atoms/Participants';
import { useGetUserQuery } from '@/services/user.service';
import React from 'react';
import styled from 'styled-components';

const ParticipantsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface IProps {
    users: { nickname: string }[];
}

const ParticipantsList = ({ users }: IProps) => {
    const { data: userData } = useGetUserQuery();
    return (
        <ParticipantsListWrapper data-testid="participantsList">
            {userData && (
                <Participants
                    key={userData.id}
                    nickname={userData.nickname}
                    isMute={false}
                    isCameraOn={false}
                />
            )}
            {users?.map(({ nickname }) => (
                <Participants
                    key={nickname}
                    nickname={nickname}
                    isMute={false}
                    isCameraOn={false}
                />
            ))}
        </ParticipantsListWrapper>
    );
};

export default ParticipantsList;
