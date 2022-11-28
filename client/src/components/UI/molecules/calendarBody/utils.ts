export const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * @param {number} year 년
 * @param {number} month 월
 * @returns 해당 년 월의 일자를 달력형태의 배열로 반환(빈 스트링은 다른 월)
 */
export const makeDay = ({ year, month }: { year: number; month: number }) => {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDay = now.getDate();
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
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
        if (year == curYear && month === curMonth && value.day === curDay)
            return { ...value, isHoliday: false, isToday: true };
        else if (idx % 7 === 0 || idx % 7 === 6)
            return { ...value, isHoliday: true, isToday: false };
        else return { ...value, isHoliday: false, isToday: false };
    });
};
