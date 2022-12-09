import Header from '@organisms/header';
import React from 'react';
import styled from 'styled-components';
import Calendar from '@organisms/calendar';

const ArtistCalendarWrapper = styled.div`
    background: ${({ theme }) => theme.LIGHT_GRAY};
    width: 100%;
    height: calc(100vh - 75px);
    padding: 40px 0;
`;

const Schedule = () => {
    return (
        <>
            <Header />
            <ArtistCalendarWrapper>
                <Calendar />
            </ArtistCalendarWrapper>
        </>
    );
};

export default Schedule;