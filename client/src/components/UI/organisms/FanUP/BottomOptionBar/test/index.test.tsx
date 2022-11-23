/**
 * @jest-environment jsdom
 */
import { MOCK_FN } from '@/utils/test/mockFn';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import BottomOptionBar from '..';

describe('<BottomOptionBar />', () => {
    beforeEach(() => {
        MOCK_FN.useParams({ fanUpId: '10' });
    });
    it('rendering test', async () => {
        renderWithContext(<BottomOptionBar />);
        for (const testId of ['muteBtn', 'cameraBtn', 'exitBtn']) {
            expect(await screen.findByTestId(testId)).toBeInTheDocument();
        }
    });
});
