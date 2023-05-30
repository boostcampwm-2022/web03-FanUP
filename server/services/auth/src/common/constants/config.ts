const environment = process.env.NODE_ENV || 'production';
const MICRO_SERVICES = {
  AUTH: {
    NAME: 'AUTH_SERVICE',
    HOST: environment === 'production' ? 'fanup-auth' : 'localhost',
    PORT: 3001,
  },
  TICKET: {
    NAME: 'TICKET_SERVICE',
    HOST: process.env.NODE_ENV === 'production' ? 'fanup-ticket' : 'localhost',
    PORT: 3003,
  },
};

export { MICRO_SERVICES };
