/**
 * @jest-environment node
 */
import React from 'react';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import RoomList from '..';

describe('<RoomList />', () => {
    it('rendering test', () => {
        renderWithContext(<RoomList />);
        // Rooms.forEach((room) => {
        //     expect(screen.getByRole('button', { name: room.time })).toBeInTheDocument();
        // });
    });
});
