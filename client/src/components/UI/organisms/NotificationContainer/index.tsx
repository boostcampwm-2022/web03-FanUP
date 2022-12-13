import React, { FC } from 'react';
import styled from 'styled-components';

import { Notification } from '@organisms/header';
import NotificationItem from '@molecules/NotificationItem';

const StyledNotificationContainer = styled.div`
    &::before {
        content: '';
        position: absolute;
        top: 1px;
        right: 0;
        width: 0;
        height: 0;
        transform: translate(-1rem, -100%);
        border-left: 0.75rem solid transparent;
        border-right: 0.75rem solid transparent;
        border-bottom: 0.75rem solid white;
    }

    cursor: default;
    position: absolute;
    z-index: 999;
    top: 70px;
    right: 3.5rem;
    width: 400px;
    font-weight: 300;
    background: white;
    border-radius: 0.5rem;
    box-sizing: border-box;
    box-shadow: 0 5px 20px rgb(0 0 0 / 8%);
`;

const StyledHeader = styled.h3`
    text-transform: uppercase;
    font-size: 75%;
    font-weight: 700;
    color: #84929f;
    padding: 1rem;
`;

interface Props {
    notifications: Notification[];
}

const NotificationContainer: FC<Props> = ({ notifications }) => {
    console.log(notifications);
    return (
        <StyledNotificationContainer>
            <StyledHeader>Notifications</StyledHeader>
            {notifications.map((notification, i) => (
                <NotificationItem key={i} notification={notification} />
            ))}
        </StyledNotificationContainer>
    );
};

export default NotificationContainer;
