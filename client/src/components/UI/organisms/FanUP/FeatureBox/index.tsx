import FeatureModeSelector from '@/components/UI/atoms/FanUP/FeatureModeSelector';
import { ReducerType } from '@/store/rootReducer';
import { FanUpStore } from '@/types/fanUp';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatBox from '../chatBox';
import ParticipantsList from '../participantsList';
import RoomList from '../RoomList';

const FeatureBoxWrapper = styled.div`
    background: #ffffff;
    box-shadow: 3px 3px 40px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    height: 100%;
    width: 400px;
    padding-bottom: 20px;
    padding-top: 20px;
`;

const FeatureContentWrapper = styled.div`
    padding: 25px;
    height: 100%;
`;

const ROOMLIST_MODE = -1;
const PARTICIPANTS_MODE = 0;
const CHAT_MODE = 1;

const FeatureContent: { [key: string]: JSX.Element } = {
    '-1': <RoomList />,
    '0': <ParticipantsList />,
    '1': <ChatBox />,
};

const FeatureBox = () => {
    const { mode } = useSelector<ReducerType, FanUpStore>((state) => state.fanUpSlice);

    return (
        <FeatureBoxWrapper>
            <FeatureModeSelector />
            <FeatureContentWrapper>{FeatureContent[String(mode)]}</FeatureContentWrapper>
        </FeatureBoxWrapper>
    );
};

export default FeatureBox;
