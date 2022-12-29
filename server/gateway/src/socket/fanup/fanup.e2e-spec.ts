/**
 * @jest-environment node
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Socket as ClientSocket, io } from 'socket.io-client';
import { FanUPGateway } from './fanup.gateway';
import { ClientsModule, ClientTCP, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { FanUPService } from './fanup.service';
import { AuthService } from '../../api/auth/auth.service';
import { of } from 'rxjs';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      ClientsModule.register([
        { name: MICRO_SERVICES.CORE.NAME, transport: Transport.TCP },
        { name: MICRO_SERVICES.AUTH.NAME, transport: Transport.TCP },
        { name: MICRO_SERVICES.TICKET.NAME, transport: Transport.TCP },
      ]),
    ],
    providers: [...gateways, FanUPService, AuthService],
  }).compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('FanUP 소켓 테스트', () => {
  let app: INestApplication;
  let service: FanUPService;
  let client: ClientSocket;
  let client1: ClientSocket;
  let client1Data = {
    socketID: '',
    userId: 1,
    nickname: '1',
    roomName: 'boostcamp',
    offer: 'client1_offer',
    answer: 'client1_answer',
    ice: 'client1_ice',
  };

  let client2: ClientSocket;
  let client2Data = {
    socketID: '',
    userId: 2,
    nickname: '2',
    roomName: 'boostcamp',
    offer: 'client2_offer',
    answer: 'client2_answer',
    ice: 'client2_ice',
  };

  let client3: ClientSocket;
  let client3SocketID: string;
  let authTCP: ClientTCP;
  let coreTCP: ClientTCP;
  let ticketTCP: ClientTCP;

  const mockFunction = () => {
    // mock service
    const error = {
      status: 401,
      message: 'You are not logged in',
      id: 1,
    };

    authTCP.send = jest.fn().mockReturnValue({ user: 'user' });
    authTCP.send({ cmd: 'verifyUser' }, { token: 'token' }).pipe = jest
      .fn()
      .mockReturnValue(of(error));
    service.validateRoom = jest.fn().mockReturnValue({ validate: true });
    service.validateUser = jest
      .fn()
      .mockReturnValue({ validate: true, nickname: 'test' });
    service.validateUserTicket = jest.fn().mockReturnValue(true);
    service.isArtist = jest.fn().mockReturnValue(true);
    service.storeMessage = jest.fn().mockReturnValue({ success: true });
  };

  beforeAll(async () => {
    app = await createNestApp(FanUPGateway);
    app.listen(3000);
    await app.init();

    // 서비스 가져오기
    service = app.get(FanUPService);

    // 마이크로서비스 가져오기
    authTCP = app.get(MICRO_SERVICES.AUTH.NAME);
    coreTCP = app.get(MICRO_SERVICES.CORE.NAME);
    ticketTCP = app.get(MICRO_SERVICES.TICKET.NAME);

    // 클라이언트 생성
    client = io('http://localhost:3000/socket/fanup', {
      extraHeaders: {
        Authorization: `Bearer token`,
      },
    });

    client1 = io('http://localhost:3000/socket/fanup', {
      extraHeaders: {
        Authorization: `Bearer token`,
      },
    });
    client2 = io('http://localhost:3000/socket/fanup', {
      extraHeaders: {
        Authorization: `Bearer token`,
      },
    });
    client3 = io('http://localhost:3000/socket/fanup', {
      extraHeaders: {
        Authorization: `Bearer token`,
      },
    });

    mockFunction();
    client1.emit('join_room', {
      userId: client1Data.userId,
      room: client1Data.roomName,
      artistId: 1,
    });

    client1Data.socketID = await new Promise<string>((resolve) => {
      client1.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    mockFunction();
    client2.emit('join_room', {
      userId: client2Data.userId,
      room: client2Data.roomName,
      artistId: 1,
    });

    client2Data.socketID = await new Promise<string>((resolve) => {
      client2.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    mockFunction();
    client3.emit('join_room', {
      userId: 3,
      room: client2Data.roomName,
      artistId: 1,
    });

    client3SocketID = await new Promise<string>((resolve) => {
      client3.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });
  });

  afterAll(async () => {
    client.disconnect();
    client1.disconnect();
    client2.disconnect();
    // client3.disconnect();
    await app.close();
  });

  it('서비스 테스트', () => {
    expect(service).toBeDefined();
  });

  it('join_room 테스트', () => {
    mockFunction();
    client.emit('join_room', {
      userId: 10,
      room: 'join_test',
      artistId: 1,
    });

    client.on('welcome', (data) => {
      expect(data.nickname).toEqual('test');
    });
  });

  it('offer 테스트', async () => {
    client1.emit('offer', {
      userId: client1Data.userId,
      nickname: client1Data.nickname,
      offer: client1Data.offer,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('offer', (data) => {
        expect(data.userId).toEqual(client1Data.userId);
        expect(data.nickname).toEqual(client1Data.nickname);
        expect(data.offer).toEqual(client1Data.offer);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  });

  it('answer 테스트', async () => {
    client1.emit('answer', {
      userId: client1Data.userId,
      answer: client1Data.answer,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('answer', (data) => {
        expect(data.userId).toEqual(client1Data.userId);
        expect(data.answer).toEqual(client1Data.answer);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  });

  it('ice 테스트', async () => {
    client1.emit('ice', {
      userId: client1Data.userId,
      ice: client1Data.ice,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('ice', (data) => {
        expect(data.userId).toEqual(client1Data.userId);
        expect(data.ice).toEqual(client1Data.ice);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  });

  it('send-message 성공 테스트', async () => {
    mockFunction();
    service.roomExist = jest.fn().mockReturnValue(true);
    client1.emit('send-message', {
      userId: 1,
      nickname: '1',
      room: 'room',
      isArtist: false,
      message: 'test',
    });

    client1.on('receive-message', (data) => {
      expect(data.message).toEqual('test');
    });
  });

  it('send-message 실패 테스트', async () => {
    client1.emit('send-message');
    client1.on('cannot-send-message', (data) => {
      expect(data.success).toEqual(false);
    });
  });

  it('request-chat 성공 테스트', async () => {
    client1.emit('request-chat', { room: 'room_example' });
    client1.on('response-chat', (data) => {
      expect(data.result).toEqual([]);
    });
  });

  it('request-chat 실패 테스트', async () => {
    client1.emit('request-chat');
    client1.on('cannot-get-all-chat', (data) => {
      expect(data.result).toEqual(null);
    });
  });

  it('request-participant-user 성공 테스트', async () => {
    client1.emit('request-participant-user', { room: 'room_example' });
    client1.on('response-participant-user', (data) => {
      expect(data.result).toEqual([]);
    });
  });

  it('request-participant-user 실패 테스트', async () => {
    client1.emit('request-participant-user');
    client1.on('cannot-get-participant-list', (data) => {
      expect(data.result).toEqual(null);
    });
  });

  it('disconnect 테스트', async () => {
    client3.disconnect();
    client1.on('leave', (data) => {
      expect(data.socketID).toEqual(client3SocketID);
    });
  });
});
