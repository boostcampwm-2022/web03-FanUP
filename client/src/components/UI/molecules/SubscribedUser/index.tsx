import React from 'react';
import DefaultImg from '@atoms/defaultImg';
import styled from 'styled-components';

interface IProps {
    user: {
        nickname: string;
        profileUrl: string;
    };
}

const SubscribedUserWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    span {
        font-size: 18px;
        font-weight: 700;
    }
`;

const SubscribedUser = ({ user }: IProps) => {
    const { nickname, profileUrl } = user;
    return (
        <SubscribedUserWrapper>
            {profileUrl ? (
                <img src={nickname} alt="profileUrl" />
            ) : (
                <DefaultImg width="75px" height="75px" borderRadius="100%" />
            )}
            <span>{nickname}</span>
        </SubscribedUserWrapper>
    );
};

export default SubscribedUser;
