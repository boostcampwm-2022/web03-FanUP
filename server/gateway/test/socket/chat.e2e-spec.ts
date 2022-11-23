/**
 * @jest-environment node
 */

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Socket as ClientSocket, io } from 'socket.io-client';
import { ChatGateway } from '../../src/socket/chat.gateway';

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
    message: 'messi',
  };

  let client2: ClientSocket;
  let client2Data = {
    socketID: '',
    email: 'jinsung1048@nate.com',
    roomName: 'boostcamp',
    message: 'ronaldo',
  };

  let client3: ClientSocket;
  let client3SocketID: string;

  beforeAll(async () => {
    app = await createNestApp(ChatGateway);
    await app.listen(3000);

    client = io('http://localhost:3000/socket/chat');
    client1 = io('http://localhost:3000/socket/chat');
    client2 = io('http://localhost:3000/socket/chat');
    client3 = io('http://localhost:3000/socket/chat');

    client1.emit('join-chat-room', {
      email: client1Data.email,
      roomName: client1Data.roomName,
    });

    client1Data.socketID = await new Promise<string>((resolve) => {
      client1.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    client2.emit('join-chat-room', {
      email: client2Data.email,
      roomName: client2Data.roomName,
    });

    client2Data.socketID = await new Promise<string>((resolve) => {
      client2.on('welcome', (data) => {
        resolve(data.socketID);
      });
    });

    client3.emit('join-chat-room', {
      email: 'disconnected_email',
      roomName: client1Data.roomName,
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

  it('join-chat-room 테스트', async () => {
    client.emit('join-chat-room', {
      email: 'client@email',
      roomName: 'join-chat-room',
    });

    await new Promise<void>((resolve) => {
      client.on('welcome', (data) => {
        expect(data.email).toEqual('client@email');
        resolve();
      });
    });
  }, 10000);

  it('send-message 테스트', async () => {
    client1.emit('send-message', {
      email: client1Data.email,
      roomName: client1Data.roomName,
      isArtist: true,
      message: client1Data.message,
    });

    await new Promise<void>((resolve) => {
      client2.on('receive-message', (data) => {
        expect(data.email).toEqual(client1Data.email);
        expect(data.isArtist).toEqual(true);
        expect(data.message).toEqual(client1Data.message);
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
