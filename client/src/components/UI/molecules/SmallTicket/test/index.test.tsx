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
        date: new Date(),
        thumbNail: '/test.png',
    };
    it('rendering test', () => {
        renderWithContext(<SmallTicket ticket={props} />);
        expect(screen.getByText(dateForm(props.date))).toBeInTheDocument();
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });
});
