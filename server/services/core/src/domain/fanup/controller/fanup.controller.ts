import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FanupService } from '../service/fanup.service';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from '../../../common/interceptor';
import { CreateTimeDto, UpdateTimeDto } from '../dto';
import { SetResponse } from '../../../common/decorator';
import { ResMessage, ResStatusCode } from '../../../common/constants';
import { AllRPCExceptionFilter } from '../../../common/filter';
import { Ticket } from '../../../common/type';

@UseFilters(new AllRPCExceptionFilter())
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class FanupController {
  constructor(private readonly fanupService: FanupService) {}

  @SetResponse(ResMessage.CREATE_FANUP, ResStatusCode.CREATED)
  @MessagePattern('createFanUP')
  async create(data: CreateTimeDto) {
    return await this.fanupService.create(data);
  }

  @SetResponse(ResMessage.CREATE_FANUP, ResStatusCode.CREATED)
  @MessagePattern('createTotalFanUP')
  async createTotalFanUP(data: Ticket) {
    return await this.fanupService.createTotalFanUP(data);
  }

  @SetResponse(ResMessage.UPDATE_FANUP, ResStatusCode.OK)
  @MessagePattern('updateFanUP')
  async update(data: UpdateTimeDto) {
    return await this.fanupService.update(data.room_id, {
      start_time: data.start_time,
      end_time: data.end_time,
    });
  }

  @SetResponse(ResMessage.GET_ALL_FANUP_BY_TICKET, ResStatusCode.OK)
  @MessagePattern('findAllByTicketId')
  async findAllByTicketId(data: { ticket_id: string }) {
    return await this.fanupService.findAllByTicketId(data.ticket_id);
  }

  @SetResponse(ResMessage.FANUP_EXIST, ResStatusCode.OK)
  @MessagePattern('isFanUPExist')
  async isExist(data: { room_id: string }) {
    return await this.fanupService.isExist(data.room_id);
  }

  @SetResponse(ResMessage.GET_ALL_FANUP, ResStatusCode.OK)
  @MessagePattern('getAllFanUP')
  async getAllFanUP() {
    return await this.fanupService.getAllFanUP();
  }

  @SetResponse(ResMessage.FIND_FANUP_BY_ROOM, ResStatusCode.OK)
  @MessagePattern('findByRoom')
  async findByRoom(roomId: string) {
    return await this.fanupService.findByRoom(roomId);
  }

  @SetResponse(ResMessage.FIND_FANUP_BY_TICKET_ID, ResStatusCode.OK)
  @MessagePattern({ cmd: 'findRoomIdByTicketId' })
  async findRoomIdByTicketId(ticketIds: number[]) {
    return await this.fanupService.findRoomIdByTicketId(ticketIds);
  }
}
