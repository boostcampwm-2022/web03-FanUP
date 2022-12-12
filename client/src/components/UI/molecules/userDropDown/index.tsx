import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/user';
import { resetUserService } from '@services/user.service';
import { useModal } from '@/hooks/useModal';
import NicknameEditModal from '../NicknameEditModal';
import { resetArtistService } from '@/services/artist.service';

const DropDownItem = styled.div`
    margin: 10px 10px 0 10px;
    width: 150px;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.MEDIUM_GRAY};
    }
`;

const UserDropDown = () => {
    const [openModal, , openNicknameEditModal, closeNicknameEditModal] = useModal();

    const dispatch = useDispatch();

    const logout = useCallback(async () => {
        if (!window.confirm('로그아웃 하시겠어요?')) return;
        localStorage.removeItem('token');
        dispatch(setToken(null));
        dispatch(resetUserService());
        dispatch(resetArtistService());
    }, []);

    return (
        <>
            <DropDownItem onClick={openNicknameEditModal}>닉네임 변경</DropDownItem>
            <DropDownItem onClick={logout}>로그아웃</DropDownItem>
            <NicknameEditModal open={openModal} onClose={closeNicknameEditModal} />
        </>
    );
};

export default UserDropDown;
