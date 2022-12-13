import * as React from 'react';
import { renderWithContext } from '@utils/test/renderWithContext';
import AllTicket from '@molecules/allTicket';
import { screen } from '@testing-library/react';
import { MOCK_FN } from '@utils/test/mockFn';
import userEvent from '@testing-library/user-event';

describe('<AllTicket />', () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        MOCK_FN.useNaviagte(mockNavigate);
    });
    const ticket = {
        startTime: new Date(),
        description: 'testDescription',
        title: 'testTitle',
        price: 1,
        id: 1,
        userCount: 5,
        salesTime: new Date(),
        artist: {
            id: 1,
            name: 'testArtist',
            profileUrl: '',
        },
    };
    it('rendering test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        expect(screen.getByText(ticket.artist?.name)).toBeInTheDocument();
        expect(screen.getByText(ticket.title)).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        const todayTicket = screen.getByTestId('allTicket');
        userEvent.click(todayTicket);
        expect(mockNavigate).toBeCalledWith(`/ticket/${ticket.id}`);
    });
});
