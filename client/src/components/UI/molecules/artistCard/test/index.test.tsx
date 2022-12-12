/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ArtistCard from '@molecules/artistCard';
import { MOCK_FN } from '@utils/test/mockFn';

describe('<ArtistCard />', () => {
    beforeEach(() => {
        MOCK_FN.intersectionObserver();
    });
    const props = {
        name: 'test',
        id: 1,
        profileUrl: '/test.png',
        isFavorite: false,
    };
    it('rendering test', () => {
        render(<ArtistCard artist={props} />);
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByAltText('background')).toBeInTheDocument();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });
});
