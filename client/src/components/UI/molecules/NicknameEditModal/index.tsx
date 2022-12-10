import Modal from '@/components/hoc/modal';
import CloseIcon from '@icons/CloseIcon';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    button {
        cursor: pointer;
    }
`;

const ModalContent = styled.form`
    display: flex;
    gap: 15px;
    input {
        font-size: 20px;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        height: 50px;
        background: ${({ theme }) => theme.LIGHT_GRAY};
        &:focus {
            outline: none;
        }
    }
    button {
        font-size: 15px;
        border: none;
        background: ${({ theme }) => theme.PRIMARY} !important;
        color: white;
        border-radius: 8px;
        height: 50px;
        padding: 0 20px;
    }
`;

const NicknameEditModal = (props: IProps) => {
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    const submitNickname = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);
    return (
        <Modal {...props}>
            <>
                <ModalHeader>
                    <h2>닉네임 변경</h2>
                    <button onClick={props.onClose}>
                        <CloseIcon />
                    </button>
                </ModalHeader>
                <ModalContent onSubmit={submitNickname}>
                    <input ref={nicknameRef} />
                    <button>변경</button>
                </ModalContent>
            </>
        </Modal>
    );
};

export default NicknameEditModal;
