const SECOND = 1000;
const MINUTE = 60;
const HOUR = 60;

export function dateDiff(date1: Date | string, date2: Date) {
    const targetDate = typeof date1 === 'string' ? new Date(date1) : date1;

    let diff = targetDate.getTime() - date2.getTime();

    const diffHours = Math.floor(diff / (SECOND * MINUTE * HOUR));
    diff -= diffHours * (SECOND * MINUTE * HOUR);
    const diffMin = Math.floor(diff / (SECOND * MINUTE));
    diff -= diffMin * (SECOND * MINUTE);
    const diffSec = Math.floor(diff / SECOND);

    return [diffHours, diffMin, diffSec];
}
