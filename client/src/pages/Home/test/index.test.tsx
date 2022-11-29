/**
 * @jest-environment jsdom
 */
import { MOCK_FN } from '@/utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import Home from '@pages/Home';
import { screen } from '@testing-library/react';

describe('<Home />', () => {
    beforeEach(() => {
        MOCK_FN.intersectionObserver();
    });
    it('rendering test', () => {
        renderWithContext(<Home />);
        expect(screen.getByAltText('banner')).toBeInTheDocument();
    });
});
