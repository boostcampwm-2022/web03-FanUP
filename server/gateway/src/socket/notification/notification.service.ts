import { Inject, Logger } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { FindNotification, UpdateNotification } from '../../common/types';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { Socket } from 'socket.io';

export class NotificationService {
  private logger: Logger = new Logger(NotificationService.name);

  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly coreTCP: ClientTCP,
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private readonly authTCP: ClientTCP,
  ) {}

  // 사용자가 알림 서비스 접속해있는 상태인지 확인
  async handleConnect(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization.split(' ')[1];
      const user = await lastValueFrom(
        this.authTCP
          .send({ cmd: 'verifyUser' }, { token })
          .pipe(catchError((err) => of(err))),
      );
      this.logger.log('check-user', user, token);
      if (!user.id) {
        socket.disconnect();
      }
    } catch (err) {
      console.log(err);
      socket.disconnect();
    }
  }

  // 해당 사용자 읽지 않는 알림 가져오기
  async findNotificationByUserID({ userId, socket, server }: FindNotification) {
    try {
      this.logger.log('get-notification: ' + socket.id);
      const result = await lastValueFrom(
        this.coreTCP
          .send('findNotificationByUserId', { userId })
          .pipe(catchError((err) => of({ ...err }))),
      );
      server.to(socket.id).emit('set-notification', { result });
    } catch (err) {
      server.to(socket.id).emit('get-notification-fail', {
        message: '메시지 가져오는데 실패하였습니다.',
        ...err,
      });
    }
  }

  // 해당 사용자가 알림을 읽었을 경우 업데이트
  async updateNotification({ id, socket, server }: UpdateNotification) {
    try {
      this.logger.log('update-notification' + socket.id);
      const result = await lastValueFrom(
        this.coreTCP
          .send('updateNotification', { id })
          .pipe(catchError((err) => of({ ...err }))),
      );
      server.to(socket.id).emit('update-notification-success', { result });
    } catch (err) {
      server.to(socket.id).emit('update-notification-fail', {
        message: '읽음 상태로 업데이트하는데 실패하였습니다.',
        ...err,
      });
    }
  }
}
