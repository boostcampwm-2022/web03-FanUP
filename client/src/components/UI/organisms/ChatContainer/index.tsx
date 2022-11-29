import React, { FC, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { socket, SOCKET_EVENTS, connectSocket, joinRoom, sendMessage } from '@/socket';
import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';

export interface ChatMessage {
    roomName: string;
    isArtist: boolean;
    email: string;
    nickname: string;
    message: string;
}

const dummyChatData: ChatMessage[] = [
    {
        roomName: '슈크림붕어빵',
        isArtist: true,
        email: '장원영',
        nickname: '장원영',
        message: '안녕하세요',
    },
    {
        roomName: '슈크림붕어빵',
        isArtist: false,
        email: '성은',
        nickname: '성은',
        message: 'Hello',
    },
    {
        roomName: '슈크림붕어빵',
        isArtist: true,
        email: '장원영',
        nickname: '장원영',
        message: '반가워요',
    },
];

const StyledChatContainer = styled.div`
    position: relative;
    height: 100%;
`;

const ChatContainer: FC = () => {
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatMessage[]>(dummyChatData);

    useEffect(() => {
        connectSocket();
        joinRoom({ roomName: '슈붕', email: 'seongeun' });
        socket?.on(SOCKET_EVENTS.receiveMessage, (data: any) => {
            console.log(data);
            setChatData((current) => [...current, data]);
        });
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            sendMessage({ roomName: '슈븅', email: 'seongeun', message: message });
            setMessage(() => '');
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
