import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';
import useSocket2 from '@hooks/useSocket2';

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
        email: 'wonyoung@gmail.com',
        nickname: '장원영',
        message: '안녕하세요',
    },
    {
        roomName: '슈크림붕어빵',
        isArtist: false,
        email: 'seongeun@gmail.com',
        nickname: '성은',
        message: 'Hello',
    },
];

const StyledChatContainer = styled.div`
    position: relative;
    height: 100%;
`;

const ChatContainer: FC = () => {
    const socket = useSocket2();
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatMessage[]>(dummyChatData);

    useEffect(() => {
        if (!socket) return;

        socket.on('receive-message', (data: any) => {
            setChatData([...chatData, data]);
        });
    }, [socket]);

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const URLSearch = new URLSearchParams(location.search);
        const userId = URLSearch.get('userId');

        if (!socket) return;

        const data = {
            email: userId,
            roomName: '슈크림붕어빵',
            isArtist: false,
            message: message,
        };

        console.log('message 전송', data);
        socket.emit('send-message', data);
    };

    return (
        <StyledChatContainer data-testid="chatContainer">
            <ChatList chatData={chatData} />
            <InputForm handleSubmit={handleSubmit} setMessage={setMessage} />
        </StyledChatContainer>
    );
};

export default ChatContainer;
