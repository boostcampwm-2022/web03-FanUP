/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import TicketBarCode from '@atoms/TicketBarCode';

describe('<TicketBarCode />', () => {
    const width = '10px';
    const height = '10px';
    it('rendering test', () => {
        render(<TicketBarCode width={width} height={height} />);
        expect(screen.getByTestId('ticketBarCode')).toHaveAttribute('width', width);
    });
});
