import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserService } from './services/create-user.service';
import { CreateUserController } from './controllers/create-user.controller';
import { PasswordHasherService } from 'src/providers/password-hasher.provider';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { USER_REPOSITORY } from './repositories/user.repository.interface';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController],
  providers: [
    PrismaService,
    CreateUserService,
    PasswordHasherService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
