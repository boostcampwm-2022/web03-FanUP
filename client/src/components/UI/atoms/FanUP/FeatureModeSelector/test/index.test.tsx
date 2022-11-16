import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import FeatureModeSelector from '..';
import * as redux from 'react-redux';
import store from '@/store';

describe('<FeatureModeSelector />', () => {
    const testStore = store;
    const mockDispatch = jest.fn();
    testStore.dispatch = mockDispatch;

    it('rendering test', () => {
        renderWithContext(<FeatureModeSelector />);
        ['시간별방리스트', '참여자목록', '채팅창'].forEach((text) => {
            expect(screen.getByTestId(text)).toBeInTheDocument();
        });
    });
    it('interaction test', () => {
        renderWithContext(<FeatureModeSelector />, testStore);
        const participantsBtn = screen.getByTestId('참여자목록');
        expect(participantsBtn).toBeInTheDocument();
        fireEvent.click(participantsBtn);
        expect(mockDispatch).toBeCalled();
    });
});
