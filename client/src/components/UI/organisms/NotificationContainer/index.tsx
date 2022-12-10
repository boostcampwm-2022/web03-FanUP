import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CloseIcon from '@icons/CloseIcon';
import Button from '@atoms/Button';

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
    right: 6rem;
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

const StyledContent = styled.div`
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

    input.checkbox {
        display: none;
        + label {
            display: block;
        }
        &:not(:checked) + label {
            transition: height 0.25s;
            height: 0;
            padding: 0;
            font-size: 0;
            border: none;
            * {
                display: none;
            }
        }
        &:checked + label {
            height: 3rem;
            padding: 1rem;
            font-size: 75%;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
    }
`;

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

interface Notification {
    roomId: string;
    startTime: string;
    endTime: string;
    userId: number;
    message: string;
}

interface NotificationItemProps {
    newNotification: Notification;
}

const NotificationItem = ({ newNotification, id }: any) => {
    return (
        <>
            <input
                className="checkbox"
                type="checkbox"
                id={id}
                value="small"
                checked
                onChange={() => console.log('알림 클릭')}
            />
            <label className="notification new" htmlFor={id}>
                <em>오늘</em> {newNotification.message}
                <i className="right">
                    <CloseIcon />
                </i>
            </label>
        </>
    );
};

interface Notification {
    roomId: string;
    startTime: string;
    endTime: string;
    userId: number;
    message: string;
}

interface Props {
    newNotifications: Notification[];
}

const NotificationContainer: FC<Props> = ({ newNotifications }) => {
    return (
        <StyledNotificationContainer>
            <StyledHeader>Notifications</StyledHeader>
            <StyledContent>
                {newNotifications.map((newNotification) => (
                    <NotificationItem
                        key={newNotification.roomId}
                        newNotification={newNotification}
                    />
                ))}
            </StyledContent>
        </StyledNotificationContainer>
    );
};

export default NotificationContainer;
