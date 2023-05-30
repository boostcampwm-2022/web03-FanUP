import { renderWithContext } from '@utils/test/renderWithContext';
import Artists from '@organisms/artists';
import { screen } from '@testing-library/react';
import { DummyAllArtists } from '@utils/dummy';
import { MOCK_FN } from '@utils/test/mockFn';

describe('<Artists />', () => {
    beforeEach(() => {
        MOCK_FN.intersectionObserver();
    });
    const props = {
        title: '나의 아티스트',
        artistList: DummyAllArtists,
    };
    it('rendering test', () => {
        renderWithContext(<Artists title={props.title} artistList={props.artistList} />);
        props.artistList.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
});
