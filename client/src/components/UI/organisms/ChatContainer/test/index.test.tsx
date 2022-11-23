/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ChatContainer from '..';

describe('<ChatBox />', () => {
    it('rendering test', () => {
        renderWithContext(<ChatContainer />);
        expect(screen.getByTestId('chatContainer')).toBeInTheDocument();
    });
});
