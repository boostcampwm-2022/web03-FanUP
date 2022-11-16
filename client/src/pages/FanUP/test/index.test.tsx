import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import FanUP from '..';
import * as ReactRouter from 'react-router';

describe('<FanUp />', () => {
    beforeEach(() => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({
            fanUpId: '10',
        });
    });
    it('rendering test', async () => {
        renderWithContext(<FanUP />);
        expect(await screen.findByRole('button', { name: '홈' })).toBeInTheDocument();
        for (const testId of ['muteBtn', 'cameraBtn', 'exitBtn']) {
            expect(await screen.findByTestId(testId)).toBeInTheDocument();
        }
    });
});
