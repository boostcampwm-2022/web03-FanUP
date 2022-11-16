import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import MuteBtn from '..';

describe('<MuteBtn />', () => {
    it('rendering test', () => {
        renderWithContext(<MuteBtn />);
        expect(screen.getByTestId('muteBtn')).toBeInTheDocument();
    });
    it('interaction test', async () => {
        renderWithContext(<MuteBtn />);
        expect(await screen.findByTestId('muteOffIcon')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('muteBtn'));
        expect(await screen.findByTestId('muteOnIcon')).toBeInTheDocument();
    });
});
