import { SERVER_URL } from '@/utils/serverUrl';
import { rest } from 'msw';

export const getArtist = rest.get(`${SERVER_URL}/artist/:artistId`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            name: 'dummyArtist',
        })
    );
});
