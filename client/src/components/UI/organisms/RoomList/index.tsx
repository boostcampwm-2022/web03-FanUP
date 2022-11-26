import RoomBtn from '@/components/UI/atoms/FanUP/RoomBtn';
import React from 'react';
import styled from 'styled-components';

const RoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const dummyRooms = ['13:00', '13:10', '13:20', '13:30', '13:40', '13:50'];

const RoomList = () => {
    return (
        <RoomListWrapper data-testid="roomList">
            {dummyRooms.map((room) => (
                <RoomBtn key={room} roomName={room} />
            ))}
        </RoomListWrapper>
    );
};

export default RoomList;
