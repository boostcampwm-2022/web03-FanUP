export const dateForm = (date: string | Date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    return (
        `${targetDate.getFullYear()}` +
        `.${targetDate.getMonth() + 1}` +
        `.${targetDate.getDate()}` +
        ` ${targetDate.getHours()}:${targetDate.getMinutes()}`
    );
};
