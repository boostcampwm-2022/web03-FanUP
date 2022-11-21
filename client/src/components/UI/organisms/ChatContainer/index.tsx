import React, { FC, useState } from 'react';
import styled from 'styled-components';

import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';

export interface ChatLog {
    isArtist: boolean;
    nickname: string;
    content: string;
}

const dummyChatData: ChatLog[] = [
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

const StyledChatContainer = styled.div`
    position: relative;
    height: 100%;
`;

const ChatContainer: FC = () => {
    const [chatData, setChatData] = useState(dummyChatData);

    return (
        <StyledChatContainer data-testid="chatContainer">
            <ChatList chatData={chatData} />
            <InputForm />
        </StyledChatContainer>
    );
};

export default ChatContainer;
