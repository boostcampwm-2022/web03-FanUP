import ChatIcon from '@/components/icons/chat';
import ClockIcon from '@/components/icons/clock';
import ParticipantsIcon from '@/components/icons/participants';
import { AppDispatch } from '@/store';
import { changeMode } from '@/store/fanUp';
import { ReducerType } from '@/store/rootReducer';
import { FanUpStore } from '@/types/fanUp';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const FeatureModeSelectorWrapper = styled.div`
    width: 400px;
    border-bottom: 1px solid #ababab;
    display: flex;
    button {
        cursor: pointer;
        border: none;
        background: none;
        flex-grow: 1;
        text-align: center;
    }
`;

const ROOMLIST_MODE = -1;
const PARTICIPANTS_MODE = 0;
const CHAT_MODE = 1;

const FeatureModeSelector = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { mode } = useSelector<ReducerType, FanUpStore>((state) => state.fanUpSlice);

    const modes = useMemo(
        () => [
            {
                icon: <ClockIcon />,
                mode: ROOMLIST_MODE,
                alt: '시간별방리스트',
                isCurrentMode: mode === ROOMLIST_MODE ? true : false,
            },
            {
                icon: <ParticipantsIcon />,
                mode: PARTICIPANTS_MODE,
                alt: '참여자목록',
                isCurrentMode: mode === PARTICIPANTS_MODE ? true : false,
            },
            {
                icon: <ChatIcon />,
                mode: CHAT_MODE,
                alt: '채팅창',
                isCurrentMode: mode === CHAT_MODE ? true : false,
            },
        ],
        [mode]
    );

    const clickMode = useCallback(
        (mode: number) => () => {
            dispatch(changeMode(mode));
        },
        []
    );

    return (
        <FeatureModeSelectorWrapper>
            {modes.map(({ icon, alt, mode, isCurrentMode }) => (
                <button
                    data-testid={alt}
                    style={{ borderBottom: isCurrentMode ? '1px solid #ababab' : '' }}
                    onClick={clickMode(mode)}
                    key={alt}
                >
                    {icon}
                </button>
            ))}
            {/* <div></div> */}
        </FeatureModeSelectorWrapper>
    );
};

export default FeatureModeSelector;
