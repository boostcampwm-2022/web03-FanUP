/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@utils/test/renderWithContext';
import CalendarHeader, { guide } from '@molecules/calendarHeader';
import { screen } from '@testing-library/react';
import { addZero } from '@utils/addZero';

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
