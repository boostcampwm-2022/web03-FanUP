import { render, screen } from '@testing-library/react';
import ArtistViewModeSelector, { mode } from '@molecules/artistListViewModeSelector';
import { renderWithContext } from '@/utils/test/renderWithContext';
import userEvent from '@testing-library/user-event';

describe('<ArtistViewModeSelector />', () => {
    it('rendering test', () => {
        renderWithContext(<ArtistViewModeSelector />);
        mode.forEach(({ text, value }) => {
            expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
        });
        expect(screen.getByRole('button', { name: '전체' })).toHaveStyle('color : black');
    });
    it('interaction test', () => {
        renderWithContext(<ArtistViewModeSelector />);
        const 전체버튼 = screen.getByRole('button', { name: '전체' });
        const 나의아티스트버튼 = screen.getByRole('button', { name: '나의 아티스트' });

        expect(전체버튼).toHaveStyle('color : black');
        userEvent.click(나의아티스트버튼);
        expect(나의아티스트버튼).toHaveStyle('color : black');
    });
});
