/**
 * @jest-environment jsdom
 */
import * as React from 'react';

import { screen } from '@testing-library/react';
import { renderWithContext } from '@utils/test/renderWithContext';
import { makeDay, week } from '@molecules/calendarBody/utils';
import CalendarBody from '@molecules/calendarBody';

describe('<CalendarBody />', () => {
    it('rendering test', () => {
        const now = new Date();
        const calendarYear = now.getFullYear();
        const calendarMonth = now.getMonth() + 1;
        renderWithContext(<CalendarBody />);
        week.forEach((day) => {
            expect(screen.getByText(day)).toBeInTheDocument();
        });
        makeDay({ calendarYear, calendarMonth }).forEach(({ day }, idx) => {
            expect(screen.getByTestId(idx)).toBeInTheDocument();
        });
    });
});
