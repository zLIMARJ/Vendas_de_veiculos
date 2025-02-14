import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...dto,
      },
    });
  }
}
