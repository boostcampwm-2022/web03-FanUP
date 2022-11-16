import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';

const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const NickName = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.DARK_GRAY};
`;

const ChatContent = styled.div`
    padding: 10px;
    border-radius: 8px;
    width: fit-content;
    max-width: 75%;
`;

interface Props {
    nickname: string;
    isArtist: boolean;
    content: string;
}

const Chat = ({ nickname, isArtist, content }: Props) => {
    return (
        <ChatWrapper style={getChatPosition(isArtist)}>
            <NickName>{nickname}</NickName>
            <ChatContent style={getContentsStyle(isArtist)}>
                <span> {content}</span>
            </ChatContent>
        </ChatWrapper>
    );
};

const getChatPosition = (isArtist: boolean) => {
    if (isArtist) return {};
    else return { alignItems: 'flex-end' };
};

const getContentsStyle = (isArtist: boolean) => {
    if (isArtist) return { background: theme.PRIMARY, color: 'white' };
    else return { background: theme.LIGHT_GRAY, color: 'black' };
};

export default Chat;
