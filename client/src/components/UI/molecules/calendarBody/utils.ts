import { CalendarData } from '@/types/artist';

export const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Day {
    isHoliday: boolean;
    isToday: boolean;
    data: any[];
    day: number;
    isCurrentMonth: boolean;
}

/**
 * @param {number} year 년
 * @param {number} month 월
 * @returns 해당 년 월의 일자를 달력형태의 배열로 반환(빈 스트링은 다른 월)
 */
export const makeDay = ({ calendarYear, calendarMonth }: CalendarData): Day[] => {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDay = now.getDate();
    const firstDay = new Date(calendarYear, calendarMonth - 1, 1);
    const lastDay = new Date(calendarYear, calendarMonth, 0);
    const prevMonthLastDay = new Date(calendarYear, calendarMonth - 1, 0).getDate();
    const firstDayOfMonth = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const days = [];
    let prevMonthDay = prevMonthLastDay - firstDayOfMonth + 1;
    for (let i = 0; i < firstDayOfMonth; i++)
        days.push({ day: prevMonthDay++, isCurrentMonth: false });
    for (let i = 1; i <= lastDateOfMonth; i++) days.push({ day: i, isCurrentMonth: true });

    let nextMonthDay = 1;
    while (days.length % 7 !== 0) days.push({ day: nextMonthDay++, isCurrentMonth: false });

    return days.map((value, idx) => {
        if (calendarYear == curYear && calendarMonth === curMonth && value.day === curDay)
            return { ...value, isHoliday: false, isToday: true, data: [] };
        else if (idx % 7 === 0 || idx % 7 === 6)
            return { ...value, isHoliday: true, isToday: false, data: [] };
        else return { ...value, isHoliday: false, isToday: false, data: [] };
    });
};
