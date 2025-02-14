import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('IUserRepository');
export interface IUserRepository {
  create(dto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
