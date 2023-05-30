import { addZero } from './addZero';

export const dateForm = (date: string | Date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    return (
        `${targetDate.getFullYear()}` +
        `.${targetDate.getMonth() + 1}` +
        `.${addZero(targetDate.getDate())}` +
        ` ${addZero(targetDate.getHours())}:${addZero(targetDate.getMinutes())}`
    );
};

export const getDate = (date: string | Date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    return (
        `${targetDate.getFullYear()}` +
        `.${targetDate.getMonth() + 1}` +
        `.${addZero(targetDate.getDate())}`
    );
};

export const getTime = (date: string | Date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    return ` ${addZero(targetDate.getHours())}:${addZero(targetDate.getMinutes())}`;
};
