import { dummyTickets } from '@/utils/dummy';
import { SERVER_URL } from '@utils/serverUrl';
import { rest } from 'msw';

export const getTodayDeadLineTickets = rest.get(`${SERVER_URL}/ticket/today`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...dummyTickets]));
});

export const getDetailTicket = rest.get(`${SERVER_URL}/ticket/:ticketId`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            id: 1,
            name: 'testArtist',
            title: 'testTitle',
            profileUrl: '/test.png',
            startTime: new Date(),
            description: 'TestDescription',
            salesTime: new Date(),
            price: 5,
            totalAmount: 30,
        })
    );
});
