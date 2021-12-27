import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Session,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorators/role.decorator';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Get()
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Roles('admin')
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
  @Roles('admin')
  @Delete(':id')
  async removeUSer(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const object = await this.authService.signUp(createUserDto);
    session.token = object.authJsonWebtoken;
    return object.user;
  }

  @Post('/signIn')
  async signIn(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const object = await this.authService.signIn(loginUserDto);
    session.token = object.authJsonWebtoken;
    return object.user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.token = null;
    return 'Sign Out';
  }
  @Roles('auth')
  @Put('edit')
  async editProfile(@Body() updateUSerDto: UpdateUserDto) {
    console.log('edit');
    return true;
  }
  @Delete('/delete')
  async deleteAccount(@Req() req: Request) {
    const user = req.currentUser;
    return await this.authService.deleteAccount(user.email);
  }
}
