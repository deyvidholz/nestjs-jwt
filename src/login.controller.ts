import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.loginService.login(username, password);
  }
}
