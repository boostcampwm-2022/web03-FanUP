import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ExitBtn from '..';

describe('<ExitBtn />', () => {
    it('rendering test', () => {
        renderWithContext(<ExitBtn />);
        expect(screen.getByTestId('exitBtn')).toBeInTheDocument();
    });
});
