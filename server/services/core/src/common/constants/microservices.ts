const environment = process.env.NODE_ENV || 'production';
const MICRO_SERVICES = {
  AUTH: {
    NAME: 'AUTH_SERVICE',
    HOST: environment === 'development' ? 'localhost' : 'host.docker.internal',
    PORT: 3001,
  },
  TICKET: {
    NAME: 'TICKET_SERVICE',
    HOST:
      process.env.NODE_ENV === 'development'
        ? '0.0.0.0'
        : 'host.docker.internal',
    PORT: 3003,
  },
};

export { MICRO_SERVICES };
