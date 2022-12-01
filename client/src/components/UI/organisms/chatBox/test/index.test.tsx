/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ChatContainer from '..';
import { MOCK_FN } from '@/utils/test/mockFn';

describe('<ChatBox />', () => {
    beforeEach(() => {
        MOCK_FN.scrollIntoView();
    });
    it('rendering test', () => {
        renderWithContext(<ChatContainer />);
        expect(screen.getByTestId('chatContainer')).toBeInTheDocument();
    });
});
