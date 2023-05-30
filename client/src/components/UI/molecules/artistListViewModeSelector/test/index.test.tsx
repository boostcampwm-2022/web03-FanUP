/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistViewModeSelector, { mode } from '@molecules/artistListViewModeSelector';
import { renderWithContext } from '@/utils/test/renderWithContext';
import userEvent from '@testing-library/user-event';
import store from '@/store';

describe('<ArtistViewModeSelector />', () => {
    const testStore = store;
    const mockDispatch = jest.fn();
    testStore.dispatch = mockDispatch;
    it('rendering test', () => {
        renderWithContext(<ArtistViewModeSelector />, testStore);
        mode.forEach(({ text, value }) => {
            expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
        });
    });
    it('interaction test', () => {
        renderWithContext(<ArtistViewModeSelector />, testStore);
        const 나의아티스트버튼 = screen.getByRole('button', { name: '나의 아티스트' });
        userEvent.click(나의아티스트버튼);
        // expect(mockDispatch).toHaveBeenCalled();
    });
});
