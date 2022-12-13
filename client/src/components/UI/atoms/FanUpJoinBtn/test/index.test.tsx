/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import FanUpJoinBtn from '@atoms/FanUpJoinBtn';
import { get_D_Day } from '@utils/get_D_Day';
import { renderWithContext } from '@/utils/test/renderWithContext';

describe('<FanUpJoinBtn />', () => {
    const date = new Date();
    it('rendering test', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        renderWithContext(<FanUpJoinBtn date={date} />);
        expect(screen.getByText(get_D_Day(date))).toBeInTheDocument();
    });
});
