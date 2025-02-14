import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // ✅ Salt configurável
    const hashedPassword = await hash(password, saltRounds); // ✅ Bcrypt recomendado
    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword); // ✅ Comparação segura contra timing attacks
  }
}
