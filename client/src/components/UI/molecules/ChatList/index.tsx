import React, { FC } from 'react';
import styled from 'styled-components';

import { ChatMessage } from '@organisms/ChatContainer';
import Chat from '@atoms/Chat';
import { useRef } from 'react';
import { useEffect } from 'react';

interface Props {
    chatData: ChatMessage[];
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
            {chatData.map(({ email, isArtist, message }, idx) => (
                <Chat key={idx} isArtist={isArtist} email={email} message={message} />
            ))}
            <div ref={lastChatRef}></div>
        </StyledChatList>
    );
};

export default ChatList;
