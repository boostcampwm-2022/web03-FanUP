/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import RoomBtn from '..';

describe('<RoomBtn />', () => {
    const dummyRoom = {
        room_id: '13:00',
        id: 101,
    };
    it('rendering test', () => {
        renderWithContext(<RoomBtn room={dummyRoom} />);
        //expect(screen.getByRole('button', { name: dummyRoom.time })).toBeInTheDocument();
    });
});
