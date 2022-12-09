/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ParticipantsList from '@organisms/participantsList';

describe('<ParticipantsList />', () => {
    const props = [{ nickname: 'testUser1' }, { nickname: 'testUser2' }];

    it('rendering test', () => {
        renderWithContext(<ParticipantsList users={props} />);
        expect(screen.getByTestId('participantsList')).toBeInTheDocument();
    });
});
