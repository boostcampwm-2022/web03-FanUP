/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@/utils/test/renderWithContext';
import Home from '@pages/Home';
import { screen } from '@testing-library/react';

describe('<Home />', () => {
    it('rendering test', () => {
        renderWithContext(<Home />);
        expect(screen.getByAltText('banner')).toBeInTheDocument();
    });
});
