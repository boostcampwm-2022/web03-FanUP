import { screen } from '@testing-library/react';
import { renderWithContext } from '@utils/test/renderWithContext';
import { makeDay, week } from '@molecules/calendarBody/utils';
import CalendarBody from '@molecules/calendarBody';

describe('<CalendarBody />', () => {
    it('rendering test', () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        renderWithContext(<CalendarBody />);
        week.forEach((day) => {
            expect(screen.getByText(day)).toBeInTheDocument();
        });
        makeDay({ year, month }).forEach(({ day }, idx) => {
            expect(screen.getByTestId(idx)).toBeInTheDocument();
        });
    });
});
