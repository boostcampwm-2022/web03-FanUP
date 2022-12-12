import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const NotificationItem = ({ notification }: any) => {
    const navigate = useNavigate();

    // TODO : Link 태그?
    const navigateByAlarmType = (type: string, id: string) => {
        navigate(`/${type}/${id}`);
    };

    return (
        <StyledNotificationItem
            className="notification new"
            onClick={() => navigateByAlarmType(notification.type, notification.id)}
        >
            <em>오늘</em> {notification.message}
            <i className="right">
                <CloseIcon />
            </i>
        </StyledNotificationItem>
    );
};

export default NotificationItem;
