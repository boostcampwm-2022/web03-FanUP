import { setupServer } from 'msw/node';
import { handlers } from './handlers/_index';

export const mockServer = setupServer(...handlers);
