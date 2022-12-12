import Modal from '@/components/hoc/modal';
import { useEditNicknameMutation } from '@/services/user.service';
import { closeUserDropDown } from '@/store/user';
import CloseIcon from '@icons/CloseIcon';
import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
        font-size: 15px;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        height: 50px;
        width: 250px;
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
        &:hover {
            background: ${({ theme }) => theme.PRIMARY_DARK} !important;
        }
    }
`;

const NicknameEditModal = (props: IProps) => {
    const [mutation] = useEditNicknameMutation();
    const dispatch = useDispatch();
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    const submitNickname = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nicknameRef.current) return;
        await mutation(nicknameRef.current.value);
        dispatch(closeUserDropDown());
        props.onClose();
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
                    <input ref={nicknameRef} placeholder="변경할 닉네임을 입력해주세요" />
                    <button>변경</button>
                </ModalContent>
            </>
        </Modal>
    );
};

export default NicknameEditModal;
