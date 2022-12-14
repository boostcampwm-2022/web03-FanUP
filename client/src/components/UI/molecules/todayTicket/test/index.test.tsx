import React from 'react';
import { renderWithContext } from '@utils/test/renderWithContext';
import TodayTicket from '@molecules/todayTicket';
import { screen } from '@testing-library/react';
import { MOCK_FN } from '@utils/test/mockFn';
import userEvent from '@testing-library/user-event';

describe('<TodayTicket />', () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        MOCK_FN.useNaviagte(mockNavigate);
    });
    const ticket = {
        startTime: new Date(),
        content: 'testDescription',
        price: 1,
        id: 1,
        ticketId: 1,
        userCount: 5,
        salesTime: new Date(),
        title: 'testTitle',
        artist: {
            name: 'testArtist',
            profileUrl: '/test.png',
            id: 1,
        },
    };
    it('rendering test', () => {
        renderWithContext(<TodayTicket ticket={ticket} />);
        expect(screen.getByText(ticket.artist.name)).toBeInTheDocument();
        expect(screen.getByText(ticket.title)).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<TodayTicket ticket={ticket} />);
        const todayTicket = screen.getByTestId('todayTicket');
        userEvent.click(todayTicket);
        expect(mockNavigate).toBeCalledWith(`/ticket/${ticket.ticketId}`);
    });
});
