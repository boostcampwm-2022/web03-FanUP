import { PartialType } from '@nestjs/mapped-types';
import CreateTicketDto from './create-ticket.dto';

class UpdateTicketDto extends PartialType(CreateTicketDto) {}
