import { ReducerType } from '@/store/rootReducer';
import { UserStore } from '@/types/user';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ArtistListViewModeSelector from '../../molecules/artistListViewModeSelector';

const ArtistsWrapper = styled.div`
    width: 100%;
    padding: 40px 60px;
    h1 {
        font-size: 28px;
        font-weight: 700;
    }
`;

const 전체 = 0;
const 나의아티스트 = 1;
const 아티스트만나보기 = 2;

const Artists = () => {
    const { artistListViewMode } = useSelector<ReducerType, UserStore>((state) => state.userSlice);
    return (
        <ArtistsWrapper>
            <ArtistListViewModeSelector />
            <h1>나의 아티스트</h1>
            <h1>아티스트 만나보기</h1>
        </ArtistsWrapper>
    );
};

export default Artists;
