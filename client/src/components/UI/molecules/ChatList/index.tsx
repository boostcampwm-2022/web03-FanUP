import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ChatMessage } from '@organisms/ChatContainer';
import Chat from '@atoms/Chat';

interface Props {
    // TODO : ChatMessage[] 안됨
    chatData: any[];
}

const StyledChatList = styled.div`
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

const ChatList: FC<Props> = ({ chatData }) => {
    const lastChatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lastChatRef.current) return;
        lastChatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, [chatData.length]);

    return (
        <StyledChatList>
            {chatData.map(({ date, nickname, isArtist, message }) => (
                <Chat key={date} isArtist={isArtist} nickname={nickname} message={message} />
            ))}
            <div ref={lastChatRef}></div>
        </StyledChatList>
    );
};

export default ChatList;
