import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import RoomList, { dummyRooms } from '..';

describe('<RoomList />', () => {
    it('rendering test', () => {
        renderWithContext(<RoomList />);
        dummyRooms.forEach((room) => {
            expect(screen.getByRole('button', { name: room })).toBeInTheDocument();
        });
    });
});
