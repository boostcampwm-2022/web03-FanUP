import { renderWithContext } from '@utils/test/renderWithContext';
import Artists from '@organisms/artists';
import { screen } from '@testing-library/react';
import { DummyMyArtists } from '@/utils/dummy';

describe('<Artists />', () => {
    const props = {
        title: '나의 아티스트',
        artistList: DummyMyArtists,
    };
    it('rendering test', () => {
        renderWithContext(<Artists title={props.title} artistList={props.artistList} />);
        props.artistList.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
});
