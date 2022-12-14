import React from 'react';
import styled from 'styled-components';
import SubscribedUser from '@molecules/SubscribedUser';
import { useGetSubscribesQuery } from '@/services/artist.service';
import NoItems from '../../atoms/NoItems';

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
    overflow-y: auto;
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
                {subscribers && subscribers?.length > 0 ? (
                    subscribers?.map((user) => <SubscribedUser key={user.nickname} user={user} />)
                ) : (
                    <NoItems
                        title="구독자가 목록이 비어있습니다 :("
                        width="30px"
                        height="30px"
                        fontSize="20px"
                    />
                )}
            </SubScribedUserListWrapper>
        </SubScribedUsersWrapper>
    );
};

export default SubScribedUsers;
