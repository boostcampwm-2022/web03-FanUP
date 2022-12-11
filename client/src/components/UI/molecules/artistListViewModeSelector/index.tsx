import { ReducerType } from '@store/rootReducer';
import { setArtistListViewMode } from '@/store/user';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

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

export const mode = [
    { text: '아티스트 만나보기', value: 1 },
    { text: '나의 아티스트', value: 2 },
];

const ArtistViewModeSelector = () => {
    const artistListViewMode = useSelector<ReducerType, number>(
        ({ userSlice }) => userSlice.artistListViewMode
    );
    const dispatch = useDispatch();

    const onClickViewMode = useCallback(
        (value: number) => () => {
            dispatch(setArtistListViewMode(value));
        },
        []
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
