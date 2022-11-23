import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';
import useSocket2 from '@hooks/useSocket2';

export interface ChatMessage {
    roomName: string;
    isArtist: boolean;
    email: string;
    message: string;
}

const dummyChatData: ChatMessage[] = [
    { email: '장원영', roomName: '슈크림붕어빵', isArtist: true, message: '안녕하세요 ㅎㅎ' },
    { email: '성은', roomName: '슈크림붕어빵', isArtist: false, message: '예쁘다~' },
    {
        email: '진성',
        roomName: '슈크림붕어빵',
        isArtist: false,
        message:
            'Custom IntegrationDevelop a fully customizable live audio-video app for any platform within a few hours.',
    },
    { email: '장원영', roomName: '슈크림붕어빵', isArtist: true, message: '안녕하세요 ㅎㅎ' },
    { email: '성은', roomName: '슈크림붕어빵', isArtist: false, message: '예쁘다~' },
    { email: '장원영', roomName: '슈크림붕어빵', isArtist: true, message: '안녕하세요 ㅎㅎ' },
    { email: '성은', roomName: '슈크림붕어빵', isArtist: false, message: '예쁘다~' },
    { email: '장원영', roomName: '슈크림붕어빵', isArtist: true, message: '안녕하세요 ㅎㅎ' },
    { email: '성은', roomName: '슈크림붕어빵', isArtist: false, message: '예쁘다~' },
    { email: '장원영', roomName: '슈크림붕어빵', isArtist: true, message: '안녕하세요 ㅎㅎ' },
    { email: '성은', roomName: '슈크림붕어빵', isArtist: false, message: '예쁘다~' },
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
