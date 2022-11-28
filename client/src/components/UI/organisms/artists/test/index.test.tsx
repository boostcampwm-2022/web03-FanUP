import { renderWithContext } from '@utils/test/renderWithContext';
import Artists from '@organisms/artists';
import { screen } from '@testing-library/react';

describe('<Artists />', () => {
    const props = {
        title: '나의 아티스트',
        artistList: Array.from({ length: 2 }, (_, idx) => {
            return {
                artistName: `testAritst${idx}`,
                backgroundThumbnail: '/test.png',
                logo: '/testLogo.png',
            };
        }),
    };
    it('rendering test', () => {
        renderWithContext(<Artists title={props.title} artistList={props.artistList} />);
        props.artistList.forEach(({ artistName }) => {
            expect(screen.getByText(artistName)).toBeInTheDocument();
        });
    });
});
