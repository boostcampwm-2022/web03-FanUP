import * as React from 'react';
import { MOCK_FN } from '@utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import ArtistsBox from '@organisms/artistsBox';
import { screen } from '@testing-library/react';

describe('<AritstBox />', () => {
    beforeEach(() => {
        MOCK_FN.intersectionObserver();
    });
    it('rendering test', () => {
        renderWithContext(<ArtistsBox />);
        //expect(screen.getByText('아티스트 만나보기')).toBeInTheDocument();
    });
});
