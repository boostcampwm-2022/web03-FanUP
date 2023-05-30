import useSearchParams from '@hooks/useSearchParams';
import { useGetFanUpRoomsQuery } from '@/services/fanup.service';
import RoomBtn from '@atoms/RoomBtn';
import React from 'react';
import styled from 'styled-components';
import { IFanUpRooms } from '@/types/fanUp';

const RoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;
const RoomList = () => {
    const { ticketId } = useSearchParams();
    const { data: rooms, isLoading } = useGetFanUpRoomsQuery(ticketId as string, {
        skip: ticketId ? false : true,
    });
    if (isLoading) return <></>;

    return (
        <RoomListWrapper data-testid="roomList">
            {rooms && (
                <RoomBtn
                    key={'아티스트방'}
                    room={rooms?.find((room) => room.fanUP_type === 'ARTIST') as IFanUpRooms}
                />
            )}
            {rooms &&
                rooms
                    ?.filter((v) => v.fanUP_type !== 'ARTIST')
                    ?.map((room) => <RoomBtn key={room.room_id} room={room} />)}
        </RoomListWrapper>
    );
};

export default RoomList;
