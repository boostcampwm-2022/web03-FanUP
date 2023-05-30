import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../../common/constants';
import { FanupService } from '../../domain/fanup/service/fanup.service';
import { NotificationService } from '../../domain/notification/service/notification.service';

@Injectable()
export class FanUPDemoTask {
  private readonly logger = new Logger(FanUPDemoTask.name);

  constructor(
    private readonly fanupService: FanupService,
    private readonly notificationService: NotificationService,

    @Inject(MICRO_SERVICES.TICKET.NAME)
    private ticketClient: ClientTCP,
  ) {}

  // 해야할 일
  // 1. 티켓을 구매한 사용자에게 들어갈 방 알림을 주기
  // 2. 티켓을 개설할 경우 구독자들에게 방 알림을 주기 [o]
  // 3. 티켓을 개설할 경우 방 생성하기 [o]
  // 4. 티켓을 구매할 경우 방을 알려주기
}
