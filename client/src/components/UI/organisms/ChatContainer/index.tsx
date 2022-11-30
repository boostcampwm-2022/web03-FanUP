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
        // TODO : 값 가져오기
        joinRoom({ roomName: '슈붕', email: 'seongeun' });
        socket?.on(SOCKET_EVENTS.receiveMessage, (data: any) => {
            setChatData((current) => [...current, data]);
        });
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            // TODO : 값 가져오기
            const data = {
                email: '성은',
                roomName: '슈붕',
                isArtist: false,
                message: message,
            };

            socket?.emit(SOCKET_EVENTS.sendMessage, data);
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
