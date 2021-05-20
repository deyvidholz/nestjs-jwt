import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { LoginService } from '../services/login.service';
import { JwtResult } from '../typings/jwt.typings';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDTO: LoginDTO): Promise<JwtResult> {
    return this.loginService.login(loginDTO);
  }
}
