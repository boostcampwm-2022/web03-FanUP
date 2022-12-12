import { dateDiff } from './dateDiff';

export const IsPast = (targetDate: Date) => {
    const [diff] = dateDiff(targetDate, new Date());
    return diff < 0 ? true : false;
};
