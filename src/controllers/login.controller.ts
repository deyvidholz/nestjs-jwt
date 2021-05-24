import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dtos/login.dto';
import { LoginService } from '../services/login.service';
import { JwtResult } from '../typings/jwt.typings';

@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiBody({ type: LoginDTO })
  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDTO: LoginDTO): Promise<JwtResult> {
    return this.loginService.login(loginDTO);
  }
}
