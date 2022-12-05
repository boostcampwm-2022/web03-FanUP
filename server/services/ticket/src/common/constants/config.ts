const environment = process.env.NODE_ENV || 'production';
const TICKET_CONFIG = {
  NAME: 'TICKET_SERVICE',
  HOST: environment === 'development' ? 'localhost' : '0.0.0.0', // todo: 배포시에는 서버의 IP로 변경
  PORT: 3003,
};

export { TICKET_CONFIG };
