import SendIcon from '@/components/icons/send';
import React from 'react';
import styled from 'styled-components';

const ChatFormWrapper = styled.form`
    width: 100%;
    position: absolute;
    bottom: 5px;
    background: #ffffff;
    border: 1px solid #8b8b8b;
    border-radius: 9px;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    button {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        cursor: pointer;
        border: none;
        background: ${({ theme }) => theme.DARK_GRAY};
    }
    input {
        width: 80%;
        border: none;
        &:focus {
            outline: none;
        }
    }
`;

const ChatForm = () => {
    return (
        <ChatFormWrapper>
            <input placeholder="메시지를 입력하세요" />
            <button>
                <SendIcon />
            </button>
        </ChatFormWrapper>
    );
};

export default ChatForm;
