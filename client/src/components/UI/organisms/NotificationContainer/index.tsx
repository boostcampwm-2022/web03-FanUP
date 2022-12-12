import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CloseIcon from '@icons/CloseIcon';
import { Notification } from '@organisms/header';

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

interface CreatedRoomNotification {
    type: string;
    roomId: string;
}

interface OpenedTicketNotification {
    type: string;
    ticketId: string;
}

// const NotificationItem = ({ id }: any) => {
//     return (
//         <>
//             <input
//                 className="checkbox"
//                 type="checkbox"
//                 id={id}
//                 value="small"
//                 checked
//                 onChange={() => console.log('check')}
//             />
//             <label className="notification new" htmlFor={id}>
//                 <em>오늘</em> 팬업 티켓팅 성공
//                 <i className="right">
//                     <CloseIcon />
//                 </i>
//             </label>
//             <input
//                 className="checkbox"
//                 type="checkbox"
//                 id={id}
//                 value="small"
//                 checked
//                 onChange={() => console.log('check')}
//             />
//             <label className="notification" htmlFor={id}>
//                 <em>3일전</em> 팬업 티켓팅 성공
//                 <i className="right">
//                     <CloseIcon />
//                 </i>
//             </label>
//         </>
//     );
// };

// TODO : 컴포넌트 분리
// const NotificationItem = ({ notification, id }: any) => {
//     const navigate = useNavigate();

//     // TODO : Link 태그?
//     const navigateByAlarmType = (type: string, id: string) => {
//         navigate(`/${type}/${id}`);
//     };

//     return (
//         <>
//             <input className="checkbox" type="checkbox" id={id} value="small" checked />
//             <label
//                 className="notification new"
//                 htmlFor={id}
//                 onClick={() => {
//                     console.log('click');
//                     navigateByAlarmType(notification.type, notification.id);
//                 }}
//             >
//                 <em>오늘</em> {notification.message}
//                 <i className="right">
//                     <CloseIcon />
//                 </i>
//             </label>
//         </>
//     );
// };

const NotificationItem = ({ notification, id }: any) => {
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

interface Props {
    notifications: Notification[];
}

const testNotification = {
    type: 'ticket',
    id: '1',
};

const NotificationContainer: FC<Props> = ({ notifications }) => {
    const navigate = useNavigate();

    const navigateByAlarmType = (type: string, id: string) => {
        navigate(`/${type}/${id}`);
    };

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
