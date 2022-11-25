import ScheduleIcon from '@/components/icons/ScheduleIcon';
import React from 'react';
import styled from 'styled-components';
import ScheduleTicket from '../../molecules/scheduleTicket';

const SchedulesWrapper = styled.div`
    background: white;
    border-radius: 20px;
`;

const Title = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 20px 20px 8px 20px;
    border-bottom: 1px solid #d3d3d3;
    h3 {
        font-weight: 700;
        font-size: 20px;
    }
`;

const ScheduleContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
`;

const Schedules = () => {
    return (
        <SchedulesWrapper>
            <Title>
                <ScheduleIcon />
                <h3>Schedule</h3>
            </Title>
            <ScheduleContentsWrapper>
                {dummySchedules.map(({ title, date, thumbNail }) => (
                    <ScheduleTicket key={title} title={title} date={date} thumbNail={thumbNail} />
                ))}
            </ScheduleContentsWrapper>
        </SchedulesWrapper>
    );
};

const dummySchedules = [
    { title: '우리 만나요~', date: new Date(), thumbNail: '' },
    { title: '두근두근 컴백', date: new Date('2022.12.21'), thumbNail: '' },
    { title: '10주년 이벤트❤️', date: new Date('2022.12.25'), thumbNail: '' },
];

export default Schedules;
