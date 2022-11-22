import React from 'react';
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

interface Props {
    roomName: string;
}

const RoomBtn = ({ roomName }: Props) => {
    return <RoomBtnWrapper>{roomName}</RoomBtnWrapper>;
};

export default RoomBtn;
