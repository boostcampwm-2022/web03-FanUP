import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import * as ReactRouter from 'react-router';
import BottomOptionBar from '..';

describe('<BottomOptionBar />', () => {
    beforeEach(() => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({
            fanUpId: '10',
        });
    });
    it('rendering test', async () => {
        renderWithContext(<BottomOptionBar />);
        for (const testId of ['muteBtn', 'cameraBtn', 'exitBtn']) {
            expect(await screen.findByTestId(testId)).toBeInTheDocument();
        }
    });
});
