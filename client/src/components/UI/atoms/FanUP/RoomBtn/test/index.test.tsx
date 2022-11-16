import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import RoomBtn from '..';

describe('<RoomBtn />', () => {
    const roomName = 'testRoom';
    it('rendering test', () => {
        renderWithContext(<RoomBtn roomName={roomName} />);
        expect(screen.getByRole('button', { name: roomName })).toBeInTheDocument();
    });
});
