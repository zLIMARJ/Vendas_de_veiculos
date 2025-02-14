import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordHasherService } from 'src/providers/password-hasher.provider';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Endereço de email já cadastrado');
    }

    const hashedPassword =
      await this.passwordHasherService.hashPassword(password);

    const newUser = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
