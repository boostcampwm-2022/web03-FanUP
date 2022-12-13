import React from 'react';
import styled from 'styled-components';
import SubscribedUser from '@molecules/SubscribedUser';
import { useGetSubscribesQuery } from '@/services/artist.service';

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
    const { data: subscribers, isLoading } = useGetSubscribesQuery();
    if (isLoading) return <></>;
    return (
        <SubScribedUsersWrapper>
            <h1>구독자 목록</h1>
            <SubScribedUserListWrapper>
                {subscribers &&
                    subscribers?.length > 0 &&
                    subscribers?.map((user) => <SubscribedUser key={user.nickname} user={user} />)}
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
