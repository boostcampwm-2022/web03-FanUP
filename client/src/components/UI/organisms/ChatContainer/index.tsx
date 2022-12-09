import React, { FC, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { socket, SOCKET_EVENTS, connectSocket } from '@/socket';
import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';
import { MyEmail, MyNickName } from '@/utils/generateRandomString';

export interface ChatMessage {
    date: number;
    isArtist: boolean;
    nickname: string;
    message: string;
}

const StyledChatContainer = styled.div`
    position: relative;
    height: 100%;
`;

const ChatContainer: FC = () => {
    const [room, setRoom] = useState<string>('1');
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatMessage[]>([]);

    // useEffect(() => {
    //     socket?.emit(SOCKET_EVENTS.requestChat, { room: room });
    //     socket?.on(SOCKET_EVENTS.responseChat, (data) => setChatData(() => [...data.result]));
    //     socket?.on(SOCKET_EVENTS.receiveMessage, (data) => setChatData((curr) => [...curr, data]));

    //     socket?.emit(SOCKET_EVENTS.requestParticipantUser, { room: room });
    //     socket?.on(SOCKET_EVENTS.responseParticipantUser, (data) => console.log(data));
    // }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            console.log('메시지 전송');

            // MyEmail, MyNickName은 랜덤스트링 생성기로 생성한 랜덤한 문자열 값임.
            // TODO : 값 가져오기
            const data = {
                email: MyEmail,
                nickname: MyNickName,
                room: '1',
                isArtist: false,
                message: message,
            };

            socket?.emit(SOCKET_EVENTS.sendMessage, data);
            setMessage('');
        },
        [message]
    );

    return (
        <StyledChatContainer data-testid="chatContainer">
            <ChatList chatData={chatData} />
            <InputForm handleSubmit={handleSubmit} message={message} setMessage={setMessage} />
        </StyledChatContainer>
    );
};

export default ChatContainer;
