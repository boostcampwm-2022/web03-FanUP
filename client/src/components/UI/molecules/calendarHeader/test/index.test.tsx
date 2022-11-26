/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@utils/test/renderWithContext';
import CalendarHeader, { addZero, guide } from '@molecules/calendarHeader';
import { screen } from '@testing-library/react';

describe('<CalendarHeader />', () => {
    it('rendering test', () => {
        const now = new Date();
        renderWithContext(<CalendarHeader />);
        expect(
            screen.getByText(`${now.getFullYear()}.${addZero(now.getMonth() + 1)}`)
        ).toBeInTheDocument();
        guide.forEach((v) => {
            expect(screen.getByText(v.text)).toBeInTheDocument();
        });
    });
});
