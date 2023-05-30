const environment = process.env.NODE_ENV || 'production';
const MICRO_SERVICES = {
  AUTH: {
    NAME: 'AUTH_SERVICE',
    HOST: environment === 'production' ? 'fanup-auth' : 'localhost',
    PORT: 3001,
  },
  CORE: {
    NAME: 'CORE_SERVICE',
    HOST: environment === 'production' ? 'fanup-core' : 'localhost',
    PORT: 3002,
  },
};

export { MICRO_SERVICES };
