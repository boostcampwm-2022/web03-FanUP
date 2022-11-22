import { renderWithContext } from '@utils/test/renderWithContext';
import CalendarNextBtn from '@atoms/calendarNextBtn';
import store from '@store/index';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<CalendarNextBtn />', () => {
    const testStore = store;
    const mockDispatch = jest.fn();
    testStore.dispatch = mockDispatch;

    it('rendering test', () => {
        renderWithContext(<CalendarNextBtn />, testStore);
        expect(screen.getByTestId('calendarNextBtn')).toBeInTheDocument();
    });
    it('interaction test', () => {
        renderWithContext(<CalendarNextBtn />, testStore);
        userEvent.click(screen.getByTestId('calendarNextBtn'));
        expect(mockDispatch).toHaveBeenCalled();
    });
});
