import { dateForm } from '@utils/dateForm';
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
        ticketingDate: new Date(),
        ticketingTime: '11:11',
        description: 'testDescription',
        artistName: 'testArtist',
        price: 1,
        ticketId: 1,
        userCount: 5,
        fanUpDate: new Date(),
        fanUpTime: '11:!1',
    };
    it('rendering test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        expect(screen.getByText(dateForm(ticket.ticketingDate))).toBeInTheDocument();
        expect(screen.getByText(ticket.ticketingTime)).toBeInTheDocument();
        expect(screen.getByText(ticket.artistName)).toBeInTheDocument();
        expect(screen.getByText(ticket.description)).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        const todayTicket = screen.getByTestId('allTicket');
        userEvent.click(todayTicket);
        expect(mockNavigate).toBeCalledWith(`/ticket/${ticket.ticketId}`);
    });
});
