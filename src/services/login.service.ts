import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dtos/login.dto';
import { User } from '../entities/user.entity';
import { EmptyCredentials } from '../exceptions/empty-credentials.exception';
import { InvalidPassword } from '../exceptions/invalid-password.exception';
import { InvalidUsername } from '../exceptions/invalid-username.exception';
import { JwtResult } from '../models/jwt-result.model';
import { Jwt } from '../typings/jwt.typings';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login({ username, password }: LoginDTO): Promise<JwtResult> {
    const isEmptyCredentials = !username || !password;

    if (isEmptyCredentials) {
      throw new EmptyCredentials();
    }

    const user = await this.usersRepository.findOne({ email: username });

    if (!user) {
      throw new InvalidUsername(username);
    }

    const isInvalidPassword = !user.isValidPassword(password);

    if (isInvalidPassword) {
      throw new InvalidPassword();
    }

    const jwt: Jwt = { sub: user.id };
    const jwtResult: JwtResult = { accessToken: this.jwtService.sign(jwt) };

    return jwtResult;
  }
}
