import Header from '@/components/UI/layout/header';
import BottomOptionBar from '@/components/UI/organisms/FanUP/BottomOptionBar';
import FeatureBox from '@/components/UI/organisms/FanUP/FeatureBox';
import VideoList from '@/components/UI/organisms/FanUP/VideoList';
import React from 'react';
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
    const { isLoading } = useCheckFanUp();
    if (isLoading) return <div>...loading</div>;
    return (
        <>
            <Header />
            <FanUpWrapper>
                <FanUpRightSection>
                    <VideoList />
                    <BottomOptionBar />
                </FanUpRightSection>
                <FeatureBox />
            </FanUpWrapper>
        </>
    );
};

export default FanUP;
