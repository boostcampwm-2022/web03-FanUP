import React, { FC } from 'react';
import styled from 'styled-components';

import { ChatLog } from '@organisms/ChatContainer';

interface StyledProps {
    isArtist: boolean;
}

type Props = ChatLog;

const StyledChat = styled('div')<StyledProps>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    ${({ isArtist }) => !isArtist && 'align-items: flex-end'}
`;

const Nickname = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.DARK_GRAY};
`;

const Content = styled('div')<StyledProps>`
    background-color: ${({ isArtist, theme }) => (isArtist ? theme.PRIMARY : theme.LIGHT_GRAY)};
    color: ${({ isArtist }) => (isArtist ? 'white' : 'black')};
    padding: 10px;
    border-radius: 8px;
    width: fit-content;
    max-width: 75%;
`;

const Chat: FC<Props> = ({ nickname, isArtist, content }) => {
    return (
        <StyledChat isArtist={isArtist}>
            <Nickname>{nickname}</Nickname>
            <Content isArtist={isArtist}>
                <span> {content}</span>
            </Content>
        </StyledChat>
    );
};

export default Chat;
