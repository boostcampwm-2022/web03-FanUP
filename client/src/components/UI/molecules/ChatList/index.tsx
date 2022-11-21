import React from 'react';
import styled from 'styled-components';

import Chat from '@/components/UI/atoms/Chat';

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

const ChatList = ({ chatData }: any) => {
    return (
        <StyledChatList>
            {chatData.map(({ nickname, isArtist, content }: any, idx: number) => (
                <Chat
                    key={content + idx}
                    isArtist={isArtist}
                    nickname={nickname}
                    content={content}
                />
            ))}
        </StyledChatList>
    );
};

export default ChatList;
