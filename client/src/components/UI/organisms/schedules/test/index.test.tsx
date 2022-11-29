/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@utils/test/renderWithContext';
import Schedules from '@organisms/schedules';
import { screen } from '@testing-library/react';
import { MOCK_FN } from '@/utils/test/mockFn';

describe('<Schedules />', () => {
    it('rendering test', () => {
        renderWithContext(<Schedules />);
        expect(screen.getByText('Schedule')).toBeInTheDocument();
    });
});
