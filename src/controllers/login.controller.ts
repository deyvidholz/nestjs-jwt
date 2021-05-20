import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from '../factories/login.service';

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
