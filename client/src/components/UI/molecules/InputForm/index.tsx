import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@atoms/Button';
import SendIcon from '@/components/icons/SendIcon';
import theme from '@style/theme';

const InputFormWrapper = styled.form`
    width: 100%;
    position: absolute;
    bottom: 5px;
    background: #ffffff;
    border: 1px solid #8b8b8b;
    border-radius: 9px;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;

    input {
        width: 80%;
        border: none;
        &:focus {
            outline: none;
        }
    }
`;

const InputForm = ({ message, setMessage, handleSubmit }: any) => {
    const handleInput = (e: any) => {
        setMessage(e.target.value);
    };

    return (
        <InputFormWrapper>
            <input
                placeholder="메시지를 입력하세요"
                onChange={(e) => handleInput(e)}
                value={message}
            />
            <Button
                content={<SendIcon />}
                onClick={(e) => handleSubmit(e)}
                width="25px"
                height="25px"
                backgroundColor={theme.DARK_GRAY}
                borderRadius="100%"
            />
        </InputFormWrapper>
    );
};

export default InputForm;
