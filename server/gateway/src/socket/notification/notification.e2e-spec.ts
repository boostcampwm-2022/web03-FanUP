/**
 * @jest-environment node
 */

import { ClientsModule, ClientTCP, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Socket as ClientSocket, io } from 'socket.io-client';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      ClientsModule.register([
        { name: MICRO_SERVICES.CORE.NAME, transport: Transport.TCP },
        { name: MICRO_SERVICES.AUTH.NAME, transport: Transport.TCP },
      ]),
    ],
    providers: [...gateways, NotificationService],
  }).compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('Notification 테스트', () => {
  let client: ClientSocket;
  let clientCore: ClientSocket;
  let app: INestApplication;
  let service: NotificationService;
  let coreTCP: ClientTCP;
  let authTCP: ClientTCP;

  beforeAll(async () => {
    // 앱 실행
    app = await createNestApp(NotificationGateway);
    app.listen(3000);
    await app.init();

    // MICROSERVICE 실행
    coreTCP = app.get(MICRO_SERVICES.CORE.NAME);
    authTCP = app.get(MICRO_SERVICES.AUTH.NAME);

    // 서비스 계층 실행
    service = app.get(NotificationService);

    // 소켓 클라이언트 실행
    client = io('http://localhost:3000/socket/notification');
    clientCore = io('http://localhost:3000/socket/notification');
  });

  afterAll(() => {
    client.close();
    app.close();
  });

  it('서비스 테스트', () => {
    expect(service).toBeDefined();
  });

  it('join-notification 테스트', () => {
    client.emit('join-notification', { userId: 1 });
    client.on('join-fail', (data) => {
      expect(data.message).toEqual('연결에 실패하였습니다.');
    });
  });

  it('get-notification 성공 테스트', () => {
    coreTCP.send = jest.fn().mockReturnValue({ result: '성공' });
    client.emit('get-notification', { userId: 1 });
    client.on('set-notification', (data) => {
      expect(data.result).toEqual('성공');
    });
  });

  it('get-notification 실패 테스트', () => {
    client.emit('get-notification', { userId: 1 });
    client.on('get-notification-fail', (data) => {
      expect(data.message).toEqual('메시지 가져오는데 실패하였습니다.');
    });
  });

  it('update-notification 성공 테스트', () => {
    coreTCP.send = jest.fn().mockReturnValue({ result: '성공' });
    client.emit('update-notification', { id: 1, userId: 1 });
    client.on('update-notification-success', (data) => {
      expect(data.result).toEqual('성공');
    });
  });

  it('update-notification 실패 테스트', () => {
    client.emit('update-notification', { id: 1, userId: 1 });
    client.on('update-notification-fail', (data) => {
      expect(data.message).toEqual(
        '읽음 상태로 업데이트하는데 실패하였습니다.',
      );
    });
  });

  it('send-notification 실패 테스트', () => {
    client.emit('join-notification', { userId: 1 });
    clientCore.emit('send-notification', { user_id: 1 });
    client.on('receive-notification', (data) => {
      expect(data.user_id).toEqual(1);
    });
  });
});
