import { renderWithContext } from '@utils/test/renderWithContext';
import CalendarPrevBtn from '@atoms/calendarPrevBtn';
import store from '@store/index';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<CalendarPrevBtn />', () => {
    const testStore = store;
    const mockDispatch = jest.fn();
    testStore.dispatch = mockDispatch;

    it('rendering test', () => {
        renderWithContext(<CalendarPrevBtn />, testStore);
        expect(screen.getByTestId('calendarPrevBtn')).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<CalendarPrevBtn />, testStore);
        userEvent.click(screen.getByTestId('calendarPrevBtn'));
        expect(mockDispatch).toHaveBeenCalled();
    });
});
