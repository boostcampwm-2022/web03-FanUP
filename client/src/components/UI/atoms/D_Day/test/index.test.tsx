import { render, screen } from '@testing-library/react';
import DDay from '@atoms/D_Day';
import { get_D_Day } from '@utils/get_D_Day';

describe('<DDay />', () => {
    const date = new Date();
    it('rendering test', () => {
        render(<DDay date={date} />);
        expect(screen.getByText(get_D_Day(date))).toBeInTheDocument();
    });
});
