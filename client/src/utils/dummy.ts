export const dummyTickets = [
    { date: new Date(), price: 3, time: '13:00', name: 'BTS', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '15:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '12:00', name: 'NMIXX', description: '모두모두모여라' },
    {
        date: new Date(),
        price: 3,
        time: '09:00',
        name: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { date: new Date(), price: 3, time: '15:00', name: 'BTS', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '20:00', name: 'NewJeans', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '15:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '14:00', name: 'BTS', description: '모두모두모여라' },
    {
        date: new Date(),
        price: 3,
        time: '12:00',
        name: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { date: new Date(), price: 3, time: '16:00', name: 'NewJeans', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '18:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '11:00', name: 'NMIXX', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '13:00', name: 'IZ*ONE', description: '모두모두모여라' },
].map((v, idx) => {
    return {
        ...v,
        id: idx + 1,
    };
});
