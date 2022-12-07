import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: UserDto): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findOneByProviderInfo(provider: string, providerId: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { provider, providerId },
    });
  }
}
