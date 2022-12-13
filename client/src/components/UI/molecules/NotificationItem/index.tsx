import React, { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleNotificationModal } from '@store/user';
import { useGetUserQuery } from '@services/user.service';
import { socket, SOCKET_EVENTS } from '@organisms/header/testSocket';
import { Notification } from '@organisms/header';
import Button from '@atoms/Button';
import CloseIcon from '@icons/CloseIcon';

const StyledNotificationItem = styled.li`
    list-style: none;
    /* height: 3rem; */
    padding: 1rem;
    font-size: 75%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;

    &.new {
        /* background: #f3f9fd; */
    }

    em {
        width: 3em;
        font-weight: 700;
        font-size: 115%;
        color: #b5c4d2;
        margin-top: 2.5px;
    }

    span {
        display: block;
        width: 18.5rem;
        line-height: 1.5em;
    }
`;

interface Props {
    notification: Notification;
    setNofitifcations: Dispatch<SetStateAction<Notification[]>>;
}

const NotificationItem: FC<Props> = ({ notification, setNofitifcations }) => {
    const { data: userData } = useGetUserQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // TODO : Link 태그?, useCallback
    const navigateByType = (e: any, type: string, id: string) => {
        if (!e.currentTarget.classList.contains('notification')) return;
        dispatch(toggleNotificationModal());
        navigate(`/${type}/${id}`);
    };

    // TODO : useCallback
    const deleteNotification = (id: number) => {
        if (!socket || !userData?.id) return;
        socket.emit(SOCKET_EVENTS.updateNotification, { id: id, userId: userData?.id });
        setNofitifcations((curr: Notification[]) =>
            curr.filter((notification) => notification.id !== id)
        );
    };

    return (
        <StyledNotificationItem
            className="notification new"
            onClick={(e) => navigateByType(e, notification.type, notification.info)}
        >
            <em>오늘</em>
            <span>{notification.message}</span>
            <Button
                content={<CloseIcon />}
                onClick={() => deleteNotification(notification.id)}
                width={'30px'}
                height={'15px'}
            ></Button>
        </StyledNotificationItem>
    );
};

export default NotificationItem;
