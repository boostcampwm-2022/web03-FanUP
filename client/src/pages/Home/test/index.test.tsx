/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MOCK_FN } from '@utils/test/mockFn';
import { renderWithContext } from '@utils/test/renderWithContext';
import Home from '@pages/Home';
import { screen } from '@testing-library/react';

describe('<Home />', () => {
    beforeEach(() => {
        MOCK_FN.intersectionObserver();
    });
    it('rendering test', () => {
        renderWithContext(<Home />);
        expect(screen.getByText('No Fan, No Artist')).toBeInTheDocument();
    });
});
