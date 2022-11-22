/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@utils/test/renderWithContext';
import Calendar from '@organisms/calendar';
import { screen } from '@testing-library/react';

describe('<Calendar />', () => {
    it('rendering test', () => {
        renderWithContext(<Calendar />);
        expect(screen.getByTestId('title')).toBeInTheDocument();
    });
});
