import Header from '@organisms/header';
import React from 'react';
import styled from 'styled-components';
import Calendar from '@organisms/calendar';
import ArtistScheduleBox from '@/components/UI/organisms/ArtistScheduleBox';
import withArtistValidation from '@/components/hoc/withArtistValidation';

const ArtistCalendarWrapper = styled.div`
    background: ${({ theme }) => theme.LIGHT_GRAY};
    width: 100%;
    height: calc(100vh - 75px);
    padding: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Schedule = () => {
    return (
        <>
            <Header />
            <ArtistCalendarWrapper>
                <ArtistScheduleBox />
                <Calendar />
            </ArtistCalendarWrapper>
        </>
    );
};

export default withArtistValidation(Schedule);
