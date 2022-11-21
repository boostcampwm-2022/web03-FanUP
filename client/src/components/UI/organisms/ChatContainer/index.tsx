import React, { useState } from 'react';
import styled from 'styled-components';

import InputForm from '@molecules/InputForm';
import ChatList from '@molecules/ChatList';

const dummyChatData = [
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

const ChatBox = () => {
    const [chatData, setChatData] = useState(dummyChatData);

    return (
        <ChatBoxWrapper data-testid="chatBox">
            <ChatList chatData={chatData} />
            <InputForm />
        </ChatBoxWrapper>
    );
};

export default ChatBox;
