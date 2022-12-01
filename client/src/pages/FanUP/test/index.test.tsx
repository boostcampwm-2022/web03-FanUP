/**
 * @jest-environment jsdom
 */
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import FanUP from '../index';
import { MOCK_FN } from '@/utils/test/mockFn';
import { act } from 'react-dom/test-utils';

describe('<FanUp />', () => {
    beforeEach(() => {
        MOCK_FN.getUserMedia();
        MOCK_FN.useParams({ fanUpId: '10' });
        MOCK_FN.scrollIntoView();
    });
    it('rendering test', async () => {
        await act(async () => renderWithContext(<FanUP />));
        for (const testId of ['muteBtn', 'cameraBtn', 'exitBtn']) {
            expect(await screen.findByTestId(testId)).toBeInTheDocument();
        }
    });
});
