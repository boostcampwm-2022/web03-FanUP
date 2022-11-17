import Header from '@/components/UI/layout/header';
import BottomOptionBar from '@/components/UI/organisms/FanUP/BottomOptionBar';
import FeatureBox from '@/components/UI/organisms/FanUP/FeatureBox';
import VideoList from '@/components/UI/organisms/FanUP/VideoList';
import { useMyStream } from '@/hooks/useMyStream';
import usePreventLeave from '@/hooks/usePreventLeave';
import { useSocket } from '@/hooks/useSocket';
import { useWebRTC } from '@/hooks/useWebRTC';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCheckFanUp } from './useCheckFanUp';

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
    const { fanUpId } = useParams();
    useMyStream();
    const { isLoading } = useCheckFanUp();
    const [_, disconnect] = useSocket(fanUpId as string);
    const [userStream, peerConnections] = useWebRTC();
    //usePreventLeave();

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    if (isLoading) return <div>...loading</div>;

    return (
        <>
            <Header />
            <FanUpWrapper>
                <FanUpRightSection>
                    <VideoList userStream={userStream} />
                    <BottomOptionBar peerConnections={peerConnections} />
                </FanUpRightSection>
                <FeatureBox />
            </FanUpWrapper>
        </>
    );
};

export default FanUP;
