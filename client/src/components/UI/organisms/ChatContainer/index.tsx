import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { socket, SOCKET_EVENTS } from '@/socket';
import { useGetUserQuery } from '@services/user.service';
import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';

export interface ChatMessage {
    date?: number;
    isArtist: boolean;
    nickname: string;
    message: string;
}

const StyledChatContainer = styled.div`
    position: relative;
    height: 100%;
`;

const ChatContainer: FC = () => {
    const { fanUpId } = useParams();
    const { data: userData } = useGetUserQuery();
    const [userId, setUserId] = useState<number | undefined>(userData?.id);
    const [userNickname, setuserNickname] = useState<string | undefined>(userData?.nickname);
    const [room, setRoom] = useState<string | undefined>(fanUpId);
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatMessage[]>([]);

    useEffect(() => {
        if (!socket || !room || !userId) return;
        socket.emit(SOCKET_EVENTS.requestChat, { room: room });
        socket.on(SOCKET_EVENTS.responseChat, (data) =>
            setChatData((curr) => [...curr, ...data.result])
        );
        socket.on(SOCKET_EVENTS.receiveMessage, (data) => setChatData((curr) => [...curr, data]));
        socket.on(SOCKET_EVENTS.failSendMessage, () => alert('메시지 전송에 실패하였습니다.'));
        socket.emit(SOCKET_EVENTS.requestParticipantUser, { room: room });
    }, [socket]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const data = {
                userId: userId,
                nickname: userNickname,
                room: room,
                isArtist: false,
                message: message,
            };
            socket?.emit(SOCKET_EVENTS.sendMessage, data);
            setMessage('');
        },
        [message, room]
    );

    return (
        <StyledChatContainer data-testid="chatContainer">
            <ChatList chatData={chatData} />
            <InputForm handleSubmit={handleSubmit} message={message} setMessage={setMessage} />
        </StyledChatContainer>
    );
};

export default ChatContainer;
