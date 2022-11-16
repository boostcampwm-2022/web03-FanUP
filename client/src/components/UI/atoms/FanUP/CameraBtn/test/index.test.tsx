import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import CameraBtn from '..';

describe('<CameraBtn />', () => {
    it('rendering test', () => {
        renderWithContext(<CameraBtn />);
        expect(screen.getByTestId('cameraBtn')).toBeInTheDocument();
    });
    it('interaction test', async () => {
        renderWithContext(<CameraBtn />);
        expect(await screen.findByTestId('cameraOnIcon')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('cameraBtn'));
        expect(await screen.findByTestId('cameraOffIcon')).toBeInTheDocument();
    });
});
