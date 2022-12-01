const environment = process.env.NODE_ENV || 'development';
const MICRO_SERVICES = {
  AUTH: {
    NAME: 'AUTH_SERVICE',
    HOST: environment === 'development' ? 'localhost' : '127.0.0.1',
    PORT: 3001,
  },
  CORE: {
    NAME: 'CORE_SERVICE',
    HOST: environment === 'development' ? 'localhost' : '127.0.0.1',
    PORT: 3002,
  },
  TICKET: {
    NAME: 'TICKET_SERVICE',
    HOST: environment === 'development' ? 'localhost' : '127.0.0.1',
    PORT: 3003,
  },
};

export { MICRO_SERVICES };
