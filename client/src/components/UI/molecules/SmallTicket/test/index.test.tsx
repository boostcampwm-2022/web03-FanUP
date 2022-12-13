/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { dateForm } from '@utils/dateForm';
import SmallTicket from '@molecules/SmallTicket';
import { renderWithContext } from '@/utils/test/renderWithContext';

describe('<ScheduleTicket />', () => {
    const props = {
        title: 'testTitle',
        startTime: new Date(),
        fanupId: 'testFanUpId',
        id: 1,
        artist: {
            name: 'testArtist',
            id: 1,
            profileUrl: '/test.png',
        },
    };
    it('rendering test', () => {
        renderWithContext(<SmallTicket ticket={props} />);
        expect(screen.getByText(dateForm(props.startTime))).toBeInTheDocument();
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });
});
