import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDTO } from '../dtos/login.dto';
import { JwtResult } from '../models/jwt.model';
import { LoginService } from '../services/login.service';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({ summary: 'Authenticate user through HTTP BASIC.' })
  @ApiBody({ type: LoginDTO })
  @ApiBadRequestResponse({ description: 'Occurrs when credentials are empty.' })
  @ApiUnauthorizedResponse({
    description: 'Occurs when email or password are incorrect.',
  })
  @ApiCreatedResponse({ description: 'Return a valid JWT.', type: JwtResult })
  @Post()
  login(@Body() loginDTO: LoginDTO): Promise<JwtResult> {
    return this.loginService.login(loginDTO);
  }
}
