/**
 * @jest-environment node
 */
import { INestApplication } from '@nestjs/common';
import { ClientsModule, ClientTCP, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      ClientsModule.register([
        { name: MICRO_SERVICES.AUTH.NAME, transport: Transport.TCP },
      ]),
      AuthModule,
    ],
    providers: [...gateways],
  }).compile();

  const app = testingModule.createNestApplication();
  return app;
}

describe('Authservice 테스트', () => {
  let app: INestApplication;
  let service: AuthService;
  let apiClient: ClientTCP;

  beforeAll(async () => {
    // 앱 실행
    app = await createNestApp(AuthService);
    await app.init();

    service = app.get(AuthService);
    apiClient = app.get(MICRO_SERVICES.AUTH.NAME);
  });

  afterAll(async () => {
    await app.close();
  });

  it('getAuthHello 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue('test');
    expect(await service.getAuthHello()).toEqual('test');
  });

  it('login 테스트', async () => {
    const loginDto = {
      provider: '12345',
      accessToken: 'test',
    };
    apiClient.send = jest.fn().mockResolvedValue(loginDto);
    expect(await service.login(loginDto)).toEqual(loginDto);
  });

  it('getUserInfo 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue(1);
    expect(await service.getUserInfo(1)).toEqual(1);
  });

  it('updateUserInfo 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue('test');
    expect(await service.updateUserInfo(1, { nickname: 'test' })).toEqual(
      'test',
    );
  });

  it('createArtist 테스트', async () => {
    const dto = { nickname: '백종원' };
    apiClient.send = jest.fn().mockResolvedValue(dto);
    expect(await service.createArtist(dto)).toEqual(dto);
  });

  it('updateArtist 테스트', async () => {
    const dto = { nickname: '변경' };
    apiClient.send = jest.fn().mockResolvedValue(dto);
    expect(await service.updateArtist(dto)).toEqual(dto);
  });

  it('getAllArtist 테스트', async () => {
    const dto = [{ artistId: 1 }, { artistId: 2 }];
    apiClient.send = jest.fn().mockResolvedValue(dto);
    expect(await service.getAllArtist(1)).toEqual(dto);
  });

  it('getAllSubscriber 테스트', async () => {
    const dto = [{ userId: 1 }, { userId: 2 }];
    apiClient.send = jest.fn().mockResolvedValue(dto);
    expect(await service.getAllSubscriber(1)).toEqual(dto);
  });

  it('getFavoriteArtist 테스트', async () => {
    const dto = [{ artistId: 1 }, { artistId: 2 }];
    apiClient.send = jest.fn().mockResolvedValue(dto);
    expect(await service.getFavoriteArtist(1)).toEqual(dto);
  });

  it('createFavorite 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue(true);
    expect(await service.createFavorite({ artistId: 1, userId: 2 })).toEqual(
      true,
    );
  });

  it('deleteFavorite 테스트', async () => {
    apiClient.send = jest.fn().mockResolvedValue(true);
    expect(await service.deleteFavorite({ artistId: 1, userId: 2 })).toEqual(
      true,
    );
  });
});
