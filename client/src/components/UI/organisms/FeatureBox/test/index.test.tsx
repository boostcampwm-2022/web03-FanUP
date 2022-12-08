/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MOCK_FN } from '@/utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import FeatureBox from '..';

describe('<FeatureBox/>', () => {
    const props = [{ nickname: 'testUser1' }, { nickname: 'testUser2' }];
    beforeEach(() => {
        MOCK_FN.scrollIntoView();
    });
    it('rendering test', () => {
        renderWithContext(<FeatureBox users={props} />);
        expect(screen.getByTestId('clockIcon')).toBeInTheDocument();
        expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('participantsIcon')).toBeInTheDocument();
    });

    it('interaction test', async () => {
        renderWithContext(<FeatureBox users={props} />);
        expect(screen.getByTestId('participantsList')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('시간별방리스트'));
        expect(await screen.findByTestId('roomList')).toBeInTheDocument();
    });
});
