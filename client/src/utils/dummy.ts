function addDays(date: Date, days: number) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    return clone;
}
const now = new Date();
export const dummyTickets = [
    { price: 3, ticketingTime: '13:00', artistName: 'BTS', description: '모두모두모여라' },
    { price: 3, ticketingTime: '15:00', artistName: 'IZ*ONE', description: '모두모두모여라' },
    { price: 3, ticketingTime: '12:00', artistName: 'NMIXX', description: '모두모두모여라' },
    {
        price: 3,
        ticketingTime: '09:00',
        artistName: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { price: 3, ticketingTime: '15:00', artistName: 'BTS', description: '모두모두모여라' },
    { price: 3, ticketingTime: '20:00', artistName: 'NewJeans', description: '모두모두모여라' },
    { price: 3, ticketingTime: '15:00', artistName: 'IZ*ONE', description: '모두모두모여라' },
    { price: 3, ticketingTime: '14:00', artistName: 'BTS', description: '모두모두모여라' },
    {
        price: 3,
        ticketingTime: '12:00',
        artistName: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { price: 3, ticketingTime: '16:00', artistName: 'NewJeans', description: '모두모두모여라' },
    { price: 3, ticketingTime: '18:00', artistName: 'IZ*ONE', description: '모두모두모여라' },
    { price: 3, ticketingTime: '11:00', artistName: 'NMIXX', description: '모두모두모여라' },
    { price: 3, ticketingTime: '13:00', artistName: 'IZ*ONE', description: '모두모두모여라' },
].map((v, idx) => {
    now.setSeconds(now.getSeconds() + idx);
    return {
        ...v,
        ticketingDate: now,
        userCount: 5,
        fanUpDate: addDays(now, idx + 3),
        fanUpTime: '11:11',
        ticketId: idx + 1,
    };
});
