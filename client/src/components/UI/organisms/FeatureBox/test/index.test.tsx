/**
 * @jest-environment jsdom
 */
import { MOCK_FN } from '@/utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import FeatureBox from '..';

describe('<FeatureBox/>', () => {
    beforeEach(() => {
        MOCK_FN.scrollIntoView();
    });
    it('rendering test', () => {
        renderWithContext(<FeatureBox />);
        expect(screen.getByTestId('clockIcon')).toBeInTheDocument();
        expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('participantsIcon')).toBeInTheDocument();
        expect(screen.getByTestId('chatContainer')).toBeInTheDocument();
    });

    it('interaction test', () => {
        renderWithContext(<FeatureBox />);
        expect(screen.getByTestId('chatContainer')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('참여자목록'));
        expect(screen.getByTestId('participantsList')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('시간별방리스트'));
        expect(screen.getByTestId('roomList')).toBeInTheDocument();
    });
});
