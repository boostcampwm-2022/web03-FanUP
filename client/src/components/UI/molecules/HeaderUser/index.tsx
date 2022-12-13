import React, { useCallback, useRef } from 'react';

import UserDropDown from '@molecules/userDropDown';
import styled from 'styled-components';
import useDropDownAnimation from '@/hooks/useDropdownAnimation';
import { useToggle } from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { ReducerType } from '@/store/rootReducer';
import { toggleUserDropDown } from '@/store/user';
import { useAppDispatch } from '@/store';

const User = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    gap: 10px;
    span {
        font-size: 15px;
        font-weight: 700;
    }
    img {
        background: none;
        border: none;
        cursor: pointer;
        transition: all ease 0.4s;
    }
`;

const UserDropDownWrapper = styled.div`
    position: absolute;
    transition: all ease 0.4s;
    top: 25px;
    right: 0;
    //padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    background: white;
    overflow: hidden;
    box-shadow: 0px 1px 7px #333d4b26;
`;

const UserDropDownItemWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.MEDIUM_GRAY};
    padding-bottom: 10px;
`;

interface IProps {
    nickname: string;
}

const HeaderUser = ({ nickname }: IProps) => {
    const dispatch = useAppDispatch();
    const userDropDown = useSelector<ReducerType, boolean>(
        ({ userSlice }) => userSlice.userDropDown
    );
    const toggleDropDown = useCallback(() => {
        dispatch(toggleUserDropDown());
    }, []);

    const dropDownRef = useRef<HTMLDivElement>(null);
    const dropDownIconRef = useRef<HTMLImageElement>(null);
    useDropDownAnimation(userDropDown, dropDownRef, dropDownIconRef);

    return (
        <User>
            <span>
                안녕하세요 <strong>{nickname}</strong> 님
            </span>
            <img src="/dropDown.jpg" alt="" ref={dropDownIconRef} onClick={toggleDropDown} />

            <UserDropDownWrapper style={{ height: '0px' }} ref={dropDownRef}>
                <UserDropDownItemWrapper>
                    <UserDropDown />
                </UserDropDownItemWrapper>
            </UserDropDownWrapper>
        </User>
    );
};

export default HeaderUser;
