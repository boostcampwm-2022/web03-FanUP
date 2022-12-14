import React, { useCallback } from 'react';
import DefaultImg from '@atoms/defaultImg';
import styled from 'styled-components';
import CloseIcon from '@/components/icons/CloseIcon';

interface IProps {
    user: {
        nickname: string;
        profileUrl: string;
    };
}

const SubscribedUserWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-right: 20px;
    img {
        width: 75px;
        height: 75px;
        border-radius: 100%;
    }
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
    div {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    span {
        font-size: 18px;
        font-weight: 700;
    }
`;

const SubscribedUser = ({ user }: IProps) => {
    const { nickname, profileUrl } = user;
    const deleteSubscribedUser = useCallback(() => {
        if (!window.confirm(`${nickname}님을 구독자 목록에서 삭제하시겠어요?`)) return;
    }, []);
    return (
        <SubscribedUserWrapper>
            <div>
                {profileUrl ? (
                    <img src={profileUrl} alt="profileUrl" />
                ) : (
                    <DefaultImg width="75px" height="75px" borderRadius="100%" />
                )}
                <span>{nickname}</span>
            </div>
            {/* <button onClick={deleteSubscribedUser}>
                <CloseIcon />
            </button> */}
        </SubscribedUserWrapper>
    );
};

export default SubscribedUser;
