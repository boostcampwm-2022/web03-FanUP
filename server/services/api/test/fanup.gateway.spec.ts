import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server, Socket } from 'socket.io';

import * as express from 'express';
import { FanUPGateway } from '../src/fanup/fanup.gateway';
import { createServer } from 'http';

describe('FanUP 소켓 테스트', () => {
  let socket: Socket;
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [FanUPGateway],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  // describe();
});
