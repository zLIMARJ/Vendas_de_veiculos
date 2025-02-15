import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignInDto } from './sign-in.dto';
import { SignInService } from './sign-in.service';

@Controller('auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('sign-in')
  async handleSignIn(@Body() signInDto: SignInDto) {
    return await this.signInService.execute(signInDto);
  }
}
