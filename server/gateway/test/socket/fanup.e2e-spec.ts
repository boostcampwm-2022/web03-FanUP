/**
 * @jest-environment node
 */

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Socket as ClientSocket, io } from 'socket.io-client';
import { FanUPGateway } from '../../src/socket/fanup.gateway';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('FanUP 소켓 테스트', () => {
  let app: INestApplication;
  let client: ClientSocket;
  let client1: ClientSocket;
  let client1Data = {
    socketID: '',
    email: 'jinsung1048@gmail.com',
    roomName: 'boostcamp',
    offer: 'client1_offer',
    answer: 'client1_answer',
    ice: 'client1_ice',
  };

  let client2: ClientSocket;
  let client2Data = {
    socketID: '',
    email: 'jinsung1048@nate.com',
    roomName: 'boostcamp',
    offer: 'client2_offer',
    answer: 'client2_answer',
    ice: 'client2_ice',
  };

  let client3: ClientSocket;
  let client3SocketID: string;

  beforeAll(async () => {
    app = await createNestApp(FanUPGateway);
    await app.listen(3000);

    client = io('http://localhost:3000/socket/fanup');
    client1 = io('http://localhost:3000/socket/fanup');
    client2 = io('http://localhost:3000/socket/fanup');
    client3 = io('http://localhost:3000/socket/fanup');

    client1.emit('join_room', {
      email: client1Data.email,
      roomName: client1Data.roomName,
    });

    client1Data.socketID = await new Promise<string>((resolve) => {
      client1.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    client2.emit('join_room', {
      email: client2Data.email,
      roomName: client2Data.roomName,
    });

    client2Data.socketID = await new Promise<string>((resolve) => {
      client2.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    client3.emit('join_room', {
      email: 'disconnected_email',
      roomName: client2Data.roomName,
    });

    client3SocketID = await new Promise<string>((resolve) => {
      client3.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });
  }, 10000);

  afterAll(async () => {
    client.disconnect();
    client1.disconnect();
    client2.disconnect();
    await app.close();
  }, 10000);

  it('join_room 테스트', async () => {
    client.emit('join_room', {
      email: 'client@email',
      roomName: 'join_test',
    });

    await new Promise<void>((resolve) => {
      client.on('welcome', (data) => {
        expect(data.email).toEqual('client@email');
        resolve();
      });
    });
  }, 10000);

  it('offer 테스트', async () => {
    client1.emit('offer', {
      email: client1Data.email,
      offer: client1Data.offer,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('offer', (data) => {
        expect(data.email).toEqual(client1Data.email);
        expect(data.offer).toEqual(client1Data.offer);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  }, 10000);

  it('answer 테스트', async () => {
    client1.emit('answer', {
      email: client1Data.email,
      answer: client1Data.answer,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('answer', (data) => {
        expect(data.email).toEqual(client1Data.email);
        expect(data.answer).toEqual(client1Data.answer);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  }, 10000);

  it('ice 테스트', async () => {
    client1.emit('ice', {
      email: client1Data.email,
      ice: client1Data.ice,
      targetSocketID: client2Data.socketID,
    });

    await new Promise<void>((resolve) => {
      client2.on('ice', (data) => {
        expect(data.email).toEqual(client1Data.email);
        expect(data.ice).toEqual(client1Data.ice);
        expect(data.socketID).toEqual(client1Data.socketID);
        resolve();
      });
    });
  }, 10000);

  it('disconnect 테스트', async () => {
    client3.disconnect();
    await new Promise<void>((resolve) => {
      client1.on('leave', (data) => {
        expect(data.socketID).toEqual(client3SocketID);
        resolve();
      });
    });
  }, 10000);
});
