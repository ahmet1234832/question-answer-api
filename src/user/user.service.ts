import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') protected readonly userModel: Model<UserModel>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const userEmail = await this.find(createUserDto.email);
    if (userEmail.length == 0) {
      return await createdUser.save();
    } else {
      throw new BadRequestException('This email already in use ');
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async find(email: string) {
    const user = await this.userModel.find({ email: email });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    let existingUser = await this.userModel.findById({ _id: id }).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(existingUser, updateUserDto);
    return await existingUser.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return await user.remove();
  }
}
