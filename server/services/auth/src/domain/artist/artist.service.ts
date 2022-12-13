import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Artist, User } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { MICRO_SERVICES } from 'src/common/constants/config';
import { CustomRpcException } from 'src/common/exception/custom-rpc-exception';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import requestCreateArtistDto from './dto/reqeust-create-artist.dto';
import RequestUpdateArtistDto from './dto/request-update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,

    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketClient: ClientProxy,
  ) {}

  async create({
    userId,
    name,
    profileUrl,
  }: requestCreateArtistDto): Promise<string> {
    const user = await this.userService.findOne(userId);

    if (user.role !== 'ARTIST') {
      throw new CustomRpcException(
        'User is not an artist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.artistId !== null) {
      throw new CustomRpcException(
        'User already has an artist',
        HttpStatus.BAD_REQUEST,
      );
    }

    let artist = null;
    try {
      artist = await this.prisma.artist.create({
        data: {
          name,
          profileUrl,
          user: {
            connect: { id: userId },
          },
        },
      });
      await firstValueFrom(
        this.ticketClient.send({ cmd: 'createArtist' }, artist),
      );
    } catch (e) {
      throw new CustomRpcException(
        'Cannot create artist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'artist created';
  }

  async update(updateArtistDto: RequestUpdateArtistDto) {
    const { artistId, name, profileUrl } = updateArtistDto;

    return this.prisma.artist.update({
      where: { id: artistId },
      data: { name, profileUrl },
    });
  }

  async findAll(userId: number | null) {
    if (!userId) {
      return this.prisma.artist.findMany();
    }

    const artists = await this.prisma.artist.findMany({
      include: { favorites: { where: { userId } } },
    });

    return artists.reduce((acc, artist) => {
      const { favorites, ...rest } = artist;
      console.log(artist);
      acc.push({ ...rest, isFavorite: favorites.length > 0 });
      return acc;
    }, []);
  }

  async findFavoritesByUserId(userId: number): Promise<Artist[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: { artist: true },
    });

    return favorites.map((favorite) => favorite.artist);
  }

  findOne(id: number): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async getAllSubscriber(artistId: number): Promise<any> {
    const subscribers = await this.prisma.artist.findUnique({
      where: { id: artistId },
      select: {
        favorites: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
                profileUrl: true,
              },
            },
          },
        },
      },
    });

    return subscribers.favorites.map((favorite) => favorite.user);
  }
}
