import { ReducerType } from '@store/rootReducer';
import { resetHandleSubscribed, setArtistListViewMode } from '@/store/user';
import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetSubScribedArtistQuery, useGetUserQuery } from '@/services/user.service';
import { useGetAllArtistsQuery } from '@/services/artist.service';
import { useAppDispatch } from '@/store';

const ArtistViewModeSelectorWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
`;

const ModeButton = styled.button<{ isCurrentMode: boolean }>`
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    border: none;
    background: none;
    color: ${({ isCurrentMode, theme }) => (isCurrentMode ? 'black' : theme.MEDIUM_GRAY)};
`;

const 아티스트만나보기 = 1;
const 나의아티스트 = 2;

interface ISelector {
    artistListViewMode: number;
    isUserHandleSubscribed: boolean;
}

export const mode = [
    { text: '아티스트 만나보기', value: 아티스트만나보기 },
    { text: '나의 아티스트', value: 나의아티스트 },
];

const ArtistViewModeSelector = () => {
    const { data: userData } = useGetUserQuery();
    const { refetch: refetchAllArtists } = useGetAllArtistsQuery();
    const { refetch: refetchSubscribedArtists } = useGetSubScribedArtistQuery();
    const { artistListViewMode, isUserHandleSubscribed } = useSelector<ReducerType, ISelector>(
        ({ userSlice }) => ({
            artistListViewMode: userSlice.artistListViewMode,
            isUserHandleSubscribed: userSlice.isUserHandleSubscribed,
        }),
        shallowEqual
    );
    const dispatch = useAppDispatch();

    const onClickViewMode = useCallback(
        (value: number) => () => {
            if (value === 나의아티스트 && !userData) return alert('로그인 후 이용 가능합니다');
            if (isUserHandleSubscribed) {
                dispatch(resetHandleSubscribed());
                refetchAllArtists();
                if (userData) refetchSubscribedArtists();
            }
            dispatch(setArtistListViewMode(value));
        },
        [userData, isUserHandleSubscribed]
    );
    return (
        <ArtistViewModeSelectorWrapper>
            {mode.map(({ text, value }) => (
                <ModeButton
                    onClick={onClickViewMode(value)}
                    isCurrentMode={artistListViewMode === value}
                    key={text}
                >
                    {text}
                </ModeButton>
            ))}
        </ArtistViewModeSelectorWrapper>
    );
};

export default ArtistViewModeSelector;
