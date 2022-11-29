import { dummyTickets } from '@/utils/dummy';
import { SERVER_URL } from '@utils/serverUrl';
import { rest } from 'msw';

export const getTodayDeadLineTickets = rest.get(`${SERVER_URL}/ticket/today`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...dummyTickets]));
});
