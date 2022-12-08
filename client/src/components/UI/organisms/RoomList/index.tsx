import { useGetFanUpRoomsQuery } from '@/services/fanup.service';
import RoomBtn from '@atoms/RoomBtn';
import React from 'react';
import styled from 'styled-components';

const RoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

// export const Rooms = [
//     { time: '13:00', roomIdx: 101 },
//     { time: '13:10', roomIdx: 102 },
//     { time: '13:20', roomIdx: 103 },
//     { time: '13:30', roomIdx: 104 },
//     { time: '13:40', roomIdx: 105 },
//     { time: '13:50', roomIdx: 106 },
// ];

export const dummyRooms = ['13:00', '13:10', '13:20', '13:30', '13:40', '13:50'];

const RoomList = () => {
    const { data, isLoading } = useGetFanUpRoomsQuery();
    if (isLoading) return <></>;
    const Rooms = data!.data;
    return (
        <RoomListWrapper data-testid="roomList">
            {Rooms!.map((room) => (
                <RoomBtn key={room.room_id} room={room} />
            ))}
        </RoomListWrapper>
    );
};

export default RoomList;
