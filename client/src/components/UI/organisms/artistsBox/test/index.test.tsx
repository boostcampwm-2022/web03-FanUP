import { renderWithContext } from '@/utils/test/renderWithContext';
import ArtistsBox from '@organisms/artistsBox';
import { screen } from '@testing-library/react';

describe('<AritstBox />', () => {
    it('rendering test', () => {
        renderWithContext(<ArtistsBox />);
        expect(screen.getByRole('button', { name: '나의 아티스트' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '아티스트 만나보기' })).toBeInTheDocument();

        expect(screen.getAllByText('나의 아티스트')).toHaveLength(2);
        expect(screen.getAllByText('아티스트 만나보기')).toHaveLength(2);
    });
});
