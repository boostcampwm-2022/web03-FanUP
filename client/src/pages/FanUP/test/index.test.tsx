/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import FanUP from '..';
import { MOCK_FN } from '@/utils/test/mockFn';

describe('<FanUp />', () => {
    beforeEach(() => {
        MOCK_FN.getUserMedia();
        MOCK_FN.useParams({ fanUpId: '10' });
    });
    it('rendering test', async () => {
        renderWithContext(<FanUP />);
        expect(await screen.findByRole('button', { name: '홈' })).toBeInTheDocument();
        for (const testId of ['muteBtn', 'cameraBtn', 'exitBtn']) {
            expect(await screen.findByTestId(testId)).toBeInTheDocument();
        }
    });
});
