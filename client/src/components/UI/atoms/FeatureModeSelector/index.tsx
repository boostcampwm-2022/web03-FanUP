import ChatIcon from '@icons/ChatIcon';
import ClockIcon from '@icons/ClockIcon';
import ParticipantsIcon from '@icons/ParticipantsIcon';
import { useAppDispatch } from '@store/index';
import { changeMode } from '@/store/fanUp';
import { ReducerType } from '@store/rootReducer';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSearchParams from '@/hooks/useSearchParams';
import { useGetIsFanUPArtistQuery } from '@/services/artist.service';
import { useGetUserQuery } from '@/services/user.service';
import { useParams } from 'react-router-dom';

const FeatureModeSelectorWrapper = styled.div`
    width: 400px;
    border-bottom: 1px solid #ababab;
    display: flex;
`;

const FeatureSelectBtn = styled.button<{ isCurrentMode: boolean }>`
    cursor: pointer;
    border: none;
    background: none;
    flex-grow: 1;
    text-align: center;
    border-bottom: ${({ isCurrentMode }) => (isCurrentMode ? '1px solid #ababab' : '')};
`;

const ROOMLIST_MODE = -1;
const PARTICIPANTS_MODE = 0;
const CHAT_MODE = 1;

const FeatureModeSelector = () => {
    const dispatch = useAppDispatch();
    const { data: userData } = useGetUserQuery();
    const { fanUpId } = useParams();

    const mode = useSelector<ReducerType, number>(({ fanUpSlice }) => fanUpSlice.mode);
    const { data, isLoading } = useGetIsFanUPArtistQuery(
        {
            artistId: userData?.artistId as number,
            roomId: fanUpId as string,
        },
        {
            skip: userData?.artistId && fanUpId ? false : true,
        }
    );

    const modes = useMemo(
        () => [
            {
                icon: <ClockIcon />,
                mode: ROOMLIST_MODE,
                alt: '시간별방리스트',
                isCurrentMode: mode === ROOMLIST_MODE ? true : false,
                isShow: data ? true : false,
            },
            {
                icon: <ParticipantsIcon />,
                mode: PARTICIPANTS_MODE,
                alt: '참여자목록',
                isCurrentMode: mode === PARTICIPANTS_MODE ? true : false,
                isShow: true,
            },
            {
                icon: <ChatIcon />,
                mode: CHAT_MODE,
                alt: '채팅창',
                isCurrentMode: mode === CHAT_MODE ? true : false,
                isShow: true,
            },
        ],
        [mode, data]
    );

    const clickMode = useCallback(
        (mode: number) => () => {
            dispatch(changeMode(mode));
        },
        []
    );

    if (isLoading) return <></>;

    return (
        <FeatureModeSelectorWrapper>
            {modes.map(({ icon, alt, mode, isCurrentMode, isShow }) => {
                if (isShow)
                    return (
                        <FeatureSelectBtn
                            data-testid={alt}
                            isCurrentMode={isCurrentMode}
                            onClick={clickMode(mode)}
                            key={alt}
                        >
                            {icon}
                        </FeatureSelectBtn>
                    );
            })}
            {/* <div></div> */}
        </FeatureModeSelectorWrapper>
    );
};

export default FeatureModeSelector;
