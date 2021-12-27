import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const authJsonWebtoken = jwt.sign({ user: user }, 'highwaytohell');

    return { user, authJsonWebtoken };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const user = await this.usersService.find(loginUserDto.email);
    if (user.length > 0) {
      const userPassword = user[0].password;

      const isMatch = await bcrypt.compare(loginUserDto.password, userPassword);

      if (!isMatch) {
        throw new BadRequestException('Password is incorrect');
      }

      const authJsonWebtoken = jwt.sign({ user: user }, 'highwaytohell');

      return { user, authJsonWebtoken };
    }

    throw new BadRequestException('Email in use');
  }
  async deleteAccount(email: string) {
    const existingUser = await this.usersService.find(email);

    console.log(existingUser);
  }
}
