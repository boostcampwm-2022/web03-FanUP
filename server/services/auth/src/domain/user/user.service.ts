import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import ReqeustCreateUserDto from './dto/request-create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(requestCreateUserDto: ReqeustCreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: requestCreateUserDto,
    });
  }

  updateProfileUrl(id: number, profileUrl: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        profileUrl,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        artist: true,
      },
    });
  }

  findOneByProviderInfo(provider: string, providerId: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { provider, providerId },
    });
  }
}
