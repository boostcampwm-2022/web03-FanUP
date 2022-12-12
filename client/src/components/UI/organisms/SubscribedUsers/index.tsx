import React from 'react';
import styled from 'styled-components';
import SubscribedUser from '@molecules/SubscribedUser';

const SubScribedUsersWrapper = styled.div`
    /* width: 60vw;
    min-width: 500px; */
    width: fit-content;
    width: 500px;
    padding: 40px;
    background: white;
    height: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    h1 {
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 40px;
    }
`;

const SubScribedUserListWrapper = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SubScribedUsers = () => {
    return (
        <SubScribedUsersWrapper>
            <h1>구독자 목록</h1>
            <SubScribedUserListWrapper>
                {DummySubScribedUser.map((user) => (
                    <SubscribedUser key={user.nickname} user={user} />
                ))}
            </SubScribedUserListWrapper>
        </SubScribedUsersWrapper>
    );
};

const DummySubScribedUser = Array.from({ length: 40 }, (_, idx) => {
    return {
        nickname: `testUser${idx}`,
        profileUrl: '',
    };
});
export default SubScribedUsers;
