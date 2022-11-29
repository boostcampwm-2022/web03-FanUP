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
        artist_id: 1,
        profile_url: '/test.png',
    };
    it('rendering test', () => {
        render(<ArtistCard artist={props} />);
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByAltText('background')).toBeInTheDocument();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });
});
