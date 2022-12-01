import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: UserDto) {
    return this.prisma.user.create({
      data: user,
    });
  }

  findAll() {
    const users = this.prisma.user.findMany();
    return users;
  }

  findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  findOneByProviderInfo(provider: string, providerId: string) {
    const user = this.prisma.user.findFirst({
      where: { provider, providerId },
    });
    return user;
  }
}
