import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
