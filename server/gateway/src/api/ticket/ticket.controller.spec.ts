/**
 * @jest-environment node
 */

import { CanActivate, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, ClientTCP, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../auth/auth.guard';
import { TicketController } from './ticket.controller';
import { TicketModule } from './ticket.module';

async function createNestApp(...gateways): Promise<INestApplication> {
  const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      ClientsModule.register([
        { name: MICRO_SERVICES.TICKET.NAME, transport: Transport.TCP },
      ]),
      TicketModule,
    ],
    providers: [...gateways],
  })
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('TicketController 테스트', () => {
  let app: INestApplication;
  let controller: TicketController;
  let ticketClient: ClientTCP;

  beforeAll(async () => {
    // 앱 실행
    app = await createNestApp(TicketController);
    await app.init();

    controller = app.get(TicketController);
    ticketClient = app.get(MICRO_SERVICES.TICKET.NAME);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
