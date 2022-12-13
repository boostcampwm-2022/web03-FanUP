import useSearchParams from '@/hooks/useSearchParams';
import { IFanUpRooms } from '@/types/fanUp';
import { addZero } from '@/utils/addZero';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const RoomBtnWrapper = styled.button`
    width: 100%;
    background: ${({ theme }) => theme.PRIMARY};
    color: white;
    border-radius: 8px;
    padding: 10px 0;
    text-align: center;
    border: none;
    cursor: pointer;
    width: 75%;
    &:hover {
        background: #7e3be0;
    }
`;

interface IProps {
    room: IFanUpRooms;
}

const RoomBtn = ({ room }: IProps) => {
    const { start_time, room_id, fanUP_type } = room;
    const { ticketId } = useSearchParams();
    const gotoOtherRoom = useCallback(() => {
        window.location.replace(`/fanup/${room_id}?ticketId=${ticketId}`);
    }, [room_id]);
    return (
        <RoomBtnWrapper onClick={gotoOtherRoom}>{`${
            fanUP_type === 'ARTIST' ? '대기방' : getTime(start_time)
        }`}</RoomBtnWrapper>
    );
};

const getTime = (time: string) => {
    const targetTime = new Date(time);
    return `${targetTime.getHours()}:${addZero(targetTime.getMinutes())}`;
};

export default RoomBtn;
