import Chat from '@/components/UI/atoms/FanUP/chat';
import ChatForm from '@/components/UI/atoms/FanUP/chatForm';
import React, { useState } from 'react';
import styled from 'styled-components';

const dummyChats = [
    { nickname: '장원영', isArtist: true, content: '안녕하세요 ㅎㅎ' },
    { nickname: '성은', isArtist: false, content: '예쁘다~' },
    {
        nickname: '진성',
        isArtist: false,
        content:
            'Custom IntegrationDevelop a fully customizable live audio-video app for any platform within a few hours.',
    },
    { nickname: '장원영', isArtist: true, content: '안녕하세요 ㅎㅎ' },
    { nickname: '성은', isArtist: false, content: '예쁘다~' },
    { nickname: '장원영', isArtist: true, content: '안녕하세요 ㅎㅎ' },
    { nickname: '성은', isArtist: false, content: '예쁘다~' },
    { nickname: '장원영', isArtist: true, content: '안녕하세요 ㅎㅎ' },
    { nickname: '성은', isArtist: false, content: '예쁘다~' },
    { nickname: '장원영', isArtist: true, content: '안녕하세요 ㅎㅎ' },
    { nickname: '성은', isArtist: false, content: '예쁘다~' },
];

const ChatBoxWrapper = styled.div`
    position: relative;
    height: 100%;
`;

const ChatsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
    max-height: 90%;
    overflow: auto;
    padding-top: 5px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ChatBox = () => {
    const [chats, setChats] = useState(dummyChats);
    return (
        <ChatBoxWrapper data-testid="chatBox">
            <ChatsWrapper>
                {chats.map(({ nickname, isArtist, content }, idx) => (
                    <Chat
                        key={content + idx}
                        isArtist={isArtist}
                        nickname={nickname}
                        content={content}
                    />
                ))}
            </ChatsWrapper>
            <ChatForm />
        </ChatBoxWrapper>
    );
};

export default ChatBox;
