import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ParticipantsList, { dummyParticipantsList } from '..';

describe('<ParticipantsList />', () => {
    it('rendering test', () => {
        renderWithContext(<ParticipantsList />);
        dummyParticipantsList.forEach((participant) => {
            expect(screen.getByText(participant.nickname)).toBeInTheDocument();
        });
    });
});
