import Loading from '@atoms/Loading';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import ArtistInfoForm from '@organisms/ArtistInfoForm';
import Header from '@organisms/header';
import React from 'react';
import styled from 'styled-components';
import { useGetUserQuery } from '@/services/user.service';
import SubScribedUsers from '@/components/UI/organisms/SubscribedUsers';
import withLoginValidation from '@/components/hoc/withLoginValidation';

const ArtistWrapper = styled.div`
    background: ${({ theme }) => theme.LIGHT_GRAY};
    display: flex;
    justify-content: center;
    gap: 25px;
    width: 100%;
    height: calc(100vh - 75px);
    padding: 40px 0;
`;

const Artist = () => {
    const { data: userData } = useGetUserQuery();

    return (
        <>
            <Header />
            <ArtistWrapper>
                <ArtistInfoForm />
                {userData?.artistId && <SubScribedUsers />}
            </ArtistWrapper>
        </>
    );
};

export default withLoginValidation(Artist);
