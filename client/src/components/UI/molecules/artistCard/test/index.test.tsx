/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ArtistCard from '@molecules/artistCard';

describe('<ArtistCard />', () => {
    const props = {
        name: 'test',
        backgroundThumbnail: '/test.png',
        logo: '/testLogo.png',
    };
    it('rendering test', () => {
        render(
            <ArtistCard
                name={props.name}
                backgroundThumbnail={props.backgroundThumbnail}
                logo={props.logo}
            />
        );
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByAltText('background')).toBeInTheDocument();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });
});
