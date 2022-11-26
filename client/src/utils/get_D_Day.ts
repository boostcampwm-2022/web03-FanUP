export const get_D_Day = (target: Date) => {
    const now = new Date();
    const gap = target.getTime() - now.getTime();

    if (isDDay(target)) return `D-Day`;

    const dayGap = Math.floor(gap / (1000 * 60 * 60 * 24));
    if (dayGap > 0) return `D-${dayGap - 1}`;
    const hourGap = Math.floor(gap / (1000 * 60 * 60));
    if (hourGap > 0) return `D-Day`;
    const minuteGap = Math.floor(gap / (1000 * 60));
    if (minuteGap > 0) return `D-Day`;
    const secondGap = Math.floor(gap / 1000);
    if (secondGap > 0) return `D-Day`;
    return '';
    // const result = Math.floor((now-target)/1000/60/60);
};

export const isDDay = (target: Date) => {
    const now = new Date();
    if (now.getFullYear() !== target.getFullYear()) return false;
    if (now.getMonth() !== target.getMonth()) return false;
    if (now.getDate() !== target.getDate()) return false;
    return true;
};
