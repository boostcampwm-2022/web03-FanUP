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
        startTime: new Date(),
        description: 'testDescription',
        title: 'testTitle',
        name: 'testArtist',
        price: 1,
        id: 1,
        userCount: 5,
        salesTime: new Date(),
        profileUrl: '',
    };
    it('rendering test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        expect(screen.getByText(ticket.name)).toBeInTheDocument();
        expect(screen.getByText(ticket.title)).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<AllTicket ticket={ticket} />);
        const todayTicket = screen.getByTestId('allTicket');
        userEvent.click(todayTicket);
        expect(mockNavigate).toBeCalledWith(`/ticket/${ticket.id}`);
    });
});
