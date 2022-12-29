/**
 * @jest-environment node
 */

jest.mock('rxjs', () => {
  const original = jest.requireActual('rxjs');

  return {
    ...original,
    lastValueFrom: (value) =>
      new Promise((resolve, reject) => {
        return resolve(value);
      }),
  };
});

import { INestApplication } from '@nestjs/common';
import { ClientsModule, ClientTCP, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import { CoreController } from './core.controller';
import { CoreModule } from './core.module';
import { CoreService } from './core.service';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      ClientsModule.register([
        { name: MICRO_SERVICES.CORE.NAME, transport: Transport.TCP },
      ]),
      CoreModule,
    ],
    providers: [...gateways, CoreService],
  }).compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('core 테스트', () => {
  let app: INestApplication;
  let service: CoreService;
  let apiClient: ClientTCP;

  beforeAll(async () => {
    // 앱 실행
    app = await createNestApp();
    app.listen(3000);
    await app.init();

    service = app.get(CoreService);
    apiClient = app.get(MICRO_SERVICES.CORE.NAME);
  });

  afterAll(async () => {
    await app.close();
  });

  it('to be defined', () => {
    expect(service).toBeDefined();
  });

  it('getApiHello 테스트', async () => {
    const mockData = { status: 200, data: 'hello', message: 'test' };
    apiClient.send = jest.fn().mockResolvedValue(mockData);

    expect(await service.getApiHello()).toEqual(mockData.data);
  });

  it('getAllChatMessage 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue('test');
    expect(await service.getAllChatMessage()).toEqual('test');
  });

  it('getAllFanUP 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue('test');
    expect(await service.getAllFanUP()).toEqual('test');
  });

  it('createFanUP 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue('test');
    expect(await service.createFanUP('test')).toEqual('test');
  });

  it('findAllByTicketId 테스트', async () => {
    const mockData = { status: 200, data: 'hello', message: 'test' };
    apiClient.send = jest.fn().mockResolvedValue(mockData);

    expect(await service.findAllByTicketId(1)).toEqual(mockData.data);
  });

  it('isArtist 입력 오류', async () => {
    apiClient.send = jest.fn().mockResolvedValue('mockData');
    expect(await service.isArtist(null, null)).toEqual(false);
  });

  it('isArtist 아티스트 존재하지 않음', async () => {
    const mockData = {
      status: 200,
      data: { artist_id: false },
      message: 'test',
    };
    apiClient.send = jest.fn().mockResolvedValue(mockData);
    expect(await service.isArtist(1, 'room')).toEqual(false);
  });

  it('isArtist 아티스트 존재하지만 유저가 아님', async () => {
    const mockData = {
      status: 200,
      data: { artist_id: 2 },
      message: 'test',
    };
    apiClient.send = jest.fn().mockResolvedValue(mockData);
    expect(await service.isArtist(1, 'room')).toEqual(false);
  });

  it('isArtist 아티스트임', async () => {
    const mockData = {
      status: 200,
      data: { artist_id: 1 },
      message: 'test',
    };
    apiClient.send = jest.fn().mockResolvedValue(mockData);
    expect(await service.isArtist(1, 'room')).toEqual(true);
  });
});
