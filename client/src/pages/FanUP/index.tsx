import Header from '@/components/UI/organisms/header';
import BottomOptionBar from '@organisms/BottomOptionBar';
import FeatureBox from '@/components/UI/organisms/FeatureBox';
import VideoList from '@/components/UI/organisms/VideoList';
import { useMyStream } from '@/hooks/useMyStream';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCheckFanUp } from './useCheckFanUp';
import useFanUP from '@hooks/useFanUP';
import { useCheckLogin } from '@hooks/useCheckLogin';
import Loading from '@atoms/Loading';
import withLoginValidation from '@/components/hoc/withLoginValidation';

const FanUpWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 25px;
    height: calc(100vh - 75px);
    width: 100%;
`;

const FanUpRightSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
`;

const FanUP = () => {
    useMyStream();
    const { isLoading } = useCheckFanUp();
    const [users, peerConnections] = useFanUP();
    if (isLoading) return <Loading />;
    return (
        <>
            <Header />
            <FanUpWrapper>
                <FanUpRightSection>
                    <VideoList userStream={users} />
                    <BottomOptionBar peerConnections={peerConnections} />
                </FanUpRightSection>
                <FeatureBox users={users} />
            </FanUpWrapper>
        </>
    );
};

export default withLoginValidation(FanUP);
