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
    room: {
        id: number;
        room_id: string;
    };
}

const RoomBtn = ({ room }: IProps) => {
    const { id, room_id } = room;
    const gotoOtherRoom = useCallback(() => {
        window.location.replace(`/fanup/${room_id}`);
    }, [room_id]);
    return <RoomBtnWrapper onClick={gotoOtherRoom}>{`13:${room.id}0`}</RoomBtnWrapper>;
};

export default RoomBtn;
