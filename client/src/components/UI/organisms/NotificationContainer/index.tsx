import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { socket, SOCKET_EVENTS, connectSocket, SOCKET_FEATURE } from '@/socket';

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

    h3 {
        text-transform: uppercase;
        font-size: 75%;
        font-weight: 700;
        color: #84929f;
        padding: 1rem;
    }

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
        margin-right: 2rem;
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

const StyledNotificationItem = styled(React.Fragment)``;

const NotificationItem = () => {
    return (
        <StyledNotificationItem>
            <input className="checkbox" type="checkbox" id="size_5" value="small" checked />
            <label className="notification" htmlFor="size_5">
                <em>1</em> blog post <a href="">comment(s)</a> need approval.
                <i className="material-icons dp48 right">clear</i>
            </label>
        </StyledNotificationItem>
    );
};

const NotificationContainer = () => {
    useEffect(() => {
        connectSocket(SOCKET_FEATURE.notification);
    }, []);

    return (
        <StyledNotificationContainer>
            <h3>Notifications</h3>

            <input className="checkbox" type="checkbox" id="size_1" value="small" checked />
            <label className="notification new" htmlFor="size_1">
                <em>1</em> new <a href="">guest account(s)</a> have been created.
                <i className="material-icons dp48 right">clear</i>
            </label>

            <input className="checkbox" type="checkbox" id="size_5" value="small" checked />
            <label className="notification" htmlFor="size_5">
                <em>1</em> blog post <a href="">comment(s)</a> need approval.
                <i className="material-icons dp48 right">clear</i>
            </label>
        </StyledNotificationContainer>
    );
};

export default NotificationContainer;
