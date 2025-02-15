import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../users/repositories/user.repository';
import { PasswordHasherService } from 'src/providers/password-hasher.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.validation';
import { SignInController } from './sign.controller';
import { SignInService } from './sign-in.service';
import { UsersModule } from '../users/user.module';

@Module({
  controllers: [SignInController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvSchema, true>) => {
        const privateKey = config.get('JWT_PRIVATE_KEY');
        const publicKey = config.get('JWT_PUBLIC_KEY');

        return {
          privateKey: Buffer.from(privateKey, 'base64').toString('ascii'),
          publicKey: Buffer.from(publicKey, 'base64').toString('ascii'),
          signOptions: { algorithm: 'RS256', expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [
    PrismaService,
    PasswordHasherService,
    UserRepository,
    SignInService,
    JwtStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
