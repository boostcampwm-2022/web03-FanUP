import { MOCK_FN } from '@/utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import DetailTicket from '@organisms/detailTicket';
import { screen } from '@testing-library/react';

describe('<DetailTicket />', () => {
    beforeEach(() => {
        MOCK_FN.useParams({ ticketId: '1' });
    });
    it('rendering test', async () => {
        renderWithContext(<DetailTicket />);
        expect(await screen.findByText('Ticketing')).toBeInTheDocument();
    });
});
