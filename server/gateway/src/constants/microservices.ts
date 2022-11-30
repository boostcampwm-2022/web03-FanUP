const environment = process.env.NODE_ENV || 'development';
const MICRO_SERVICES = {
  AUTH: {
    NAME: 'AUTH_SERVICE',
    HOST: environment === 'development' ? 'localhost' : 'host.docker.internal',
    PORT: 3001,
  },
  CORE: {
    NAME: 'CORE_SERVICE',
    HOST:
      process.env.NODE_ENV === 'development'
        ? '0.0.0.0'
        : 'host.docker.internal',
    PORT: 3002,
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
