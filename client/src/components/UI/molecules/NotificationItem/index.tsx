import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useGetUserQuery } from '@services/user.service';
import { socket, SOCKET_EVENTS } from '@organisms/header/testSocket';
import { Notification } from '@organisms/header';
import CloseIcon from '@icons/CloseIcon';

const StyledNotificationItem = styled.li`
    list-style: none;
    height: 3rem;
    padding: 1rem;
    font-size: 75%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    i {
        color: #b5c4d2;
        font-size: 140%;
        position: absolute;
        &.right {
            right: 1rem;
            &:hover {
                opacity: 0.8;
                cursor: pointer;
            }
        }
    }

    em {
        width: 3em;
        margin-right: 1rem;
        font-weight: 700;
        font-size: 115%;
        color: #b5c4d2;
        vertical-align: bottom;
        display: inline-block;
    }

    .notification {
        box-sizing: border-box;
        &.new {
            background: #f3f9fd;
        }
    }
`;

interface Props {
    notification: Notification;
}

const NotificationItem: FC<Props> = ({ notification }) => {
    console.log(notification);
    const { data: userData } = useGetUserQuery();
    const navigate = useNavigate();

    // TODO : Link 태그?
    const navigateByType = (e: any, type: string, id: string) => {
        if (!e.target.classList.contains('notification')) return;
        navigate(`/${type}/${id}`);
    };

    const deleteNotification = (id: string) => {
        if (!socket) return;
        socket.emit(SOCKET_EVENTS.updateNotification, { id: id, userId: userData?.id });
    };

    return (
        <StyledNotificationItem
            className="notification new"
            onClick={(e) => navigateByType(e, notification.type, notification.id)}
        >
            <em>오늘</em> {notification.message}
            <i className="right" onClick={() => deleteNotification(notification.id)}>
                <CloseIcon />
            </i>
        </StyledNotificationItem>
    );
};

export default NotificationItem;
