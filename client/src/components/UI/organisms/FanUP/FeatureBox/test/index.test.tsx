import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import FeatureBox from '..';

describe('<FeatureBox/>', () => {
    it('rendering test', () => {
        renderWithContext(<FeatureBox />);
        expect(screen.getByTestId('clockIcon')).toBeInTheDocument();
        expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('participantsIcon')).toBeInTheDocument();
        expect(screen.getByTestId('chatBox')).toBeInTheDocument();
    });

    it('interaction test', () => {
        renderWithContext(<FeatureBox />);
        expect(screen.getByTestId('chatBox')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('참여자목록'));
        expect(screen.getByTestId('participantsList')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('시간별방리스트'));
        expect(screen.getByTestId('roomList')).toBeInTheDocument();
    });
});
