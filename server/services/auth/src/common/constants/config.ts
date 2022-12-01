const environment = process.env.NODE_ENV || 'production';
const AUTH_CONFIG = {
  NAME: 'AUTH_SERVICE',
  HOST: environment === 'development' ? 'localhost' : 'localhost', // todo: 배포시에는 서버의 IP로 변경
  PORT: 3001,
};

export { AUTH_CONFIG };
