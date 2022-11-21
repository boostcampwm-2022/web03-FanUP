import { render, screen } from '@testing-library/react';
import ScheduleTicket from '@molecules/scheduleTicket';
import { dateForm } from '@utils/dateForm';

describe('<ScheduleTicket />', () => {
    const props = {
        title: 'testTitle',
        date: new Date(),
        thumbNail: '/test.png',
    };
    it('rendering test', () => {
        render(
            <ScheduleTicket title={props.title} date={props.date} thumbNail={props.thumbNail} />
        );
        expect(screen.getByText(dateForm(props.date))).toBeInTheDocument();
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });
});
