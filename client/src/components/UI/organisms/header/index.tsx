import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserQuery } from '@services/user.service';
import LogOutBtn from '@atoms/LogOutBtn';
import { useModal } from '@/hooks/useModal';
import NicknameEditModal from '../../molecules/NicknameEditModal';

import { socket, SOCKET_EVENTS, connectSocket, SOCKET_FEATURE } from '@/socket';
import AlarmIcon from '@icons/AlarmIcon';
import Logo from '@icons/Logo';
import SearchIcon from '@icons/SearchIcon';
import UserIcon from '@icons/UserIcon';
import NotificationContainer from '@organisms/NotificationContainer';

const HeaderRoot = styled.header`
    height: 75px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.12);
    padding: 20px 42px;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
`;
const HeaderLeft = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    div {
        display: flex;
        gap: 10px;
        button {
            padding: 10px 15px;
            font-weight: 700;
            font-size: 16px;
            &:hover {
                background: ${({ theme }) => theme.LIGHT_GRAY};
            }
        }
    }
`;

const HeaderRight = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    font-weight: 700;
    position: relative;

    strong {
        background: linear-gradient(to right, #9e57ff, #7ed0fa);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        //color: ${({ theme }) => theme.LIGHT_SKY};
        //color: white;
        display: inline-block;
    }
`;

const HelloUserButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
`;

const StyledNewNotificationMark = styled.div`
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 90px;
`;

export interface Notification {
    roomId: string;
    startTime: string;
    endTime: string;
    userId: number;
    message: string;
}

const Header = () => {
    const { data: UserData } = useGetUserQuery();
    const navigate = useNavigate();
    const [open, setOpen, openNicknameModal, closeNicknameModal] = useModal();
    const [notifications, setNofitifcations] = useState<any>([]);
    const [isOnNotificationMark, setIsOnNotificationMark] = useState<boolean>(false);
    const [isOpenNotificationModal, setIsOpenNotificationModal] = useState<boolean>(false);

    useEffect(() => {
        connectSocket(SOCKET_FEATURE.notification);
        if (!socket) return;
        socket.emit(SOCKET_EVENTS.getNotification, { userId: 1 });
        socket.emit(SOCKET_EVENTS.joinNotification, { userId: 1 });
        socket.on(SOCKET_EVENTS.receiveRoomNotification, (data) => {
            setIsOnNotificationMark(true);
            setNofitifcations((curr: any) => [...curr, data]);
        });
        socket.on(SOCKET_EVENTS.setNotification, (data: any) => {
            setNofitifcations((curr: any) => [...curr, ...data.result.data]);
        });
    }, []);

    //TODO: 이 부분 로직이 복잡해지면, 따로 컴포넌트로 각각 분리
    const clickSearch = useCallback(() => {
        alert('searchCallback');
    }, []);

    const clickAlarm = useCallback(() => {
        setIsOnNotificationMark(false);
        setIsOpenNotificationModal((curr) => !curr);
    }, []);

    const clickUser = useCallback(() => {
        if (!UserData) navigate('/login');
        else alert('로그인이 완료되었어요');
    }, [UserData]);

    const gotoPage = useCallback(
        (url: string) => () => {
            return navigate(url);
        },
        [navigate]
    );

    return (
        <HeaderRoot>
            <HeaderLeft>
                <button onClick={gotoPage('/')}>
                    <Logo />
                </button>
                <div>
                    <button onClick={gotoPage('/tickets')}>티켓팅</button>
                    {UserData && <button onClick={gotoPage('/schedule')}>티켓생성</button>}
                </div>
            </HeaderLeft>
            <HeaderRight>
                {UserData && (
                    <>
                        <HelloUserButton onClick={openNicknameModal}>
                            안녕하세요 <strong>{UserData.nickname}</strong> 님
                        </HelloUserButton>
                        {open && <NicknameEditModal open={open} onClose={closeNicknameModal} />}
                    </>
                )}
                <button data-testid="search" key="search" onClick={clickSearch}>
                    {<SearchIcon />}
                </button>
                <button data-testid="alarm" key="alarm" onClick={clickAlarm}>
                    {isOnNotificationMark && <StyledNewNotificationMark />}
                    <AlarmIcon />
                </button>
                {isOpenNotificationModal && <NotificationContainer notifications={notifications} />}
                {UserData ? (
                    <LogOutBtn />
                ) : (
                    <button data-testid="user" onClick={clickUser}>
                        <UserIcon />
                    </button>
                )}
            </HeaderRight>
        </HeaderRoot>
    );
};

export default Header;
