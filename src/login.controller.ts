import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(StatusCodes.OK)
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.loginService.login(username, password);
  }
}
