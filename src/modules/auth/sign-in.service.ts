import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.repository';
import { SignInDto } from './sign-in.dto';
import { PasswordHasherService } from 'src/providers/password-hasher.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async execute({ email, password }: SignInDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Credenciais inválidas');
    }

    const isPasswordValid = await this.passwordHasherService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Credenciais inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const publicKey = this.configService.get('JWT_PUBLIC_KEY', { infer: true });
    if (!publicKey) throw new Error('JWT_PUBLIC_KEY não configurada');

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
