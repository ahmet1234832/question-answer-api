import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  MinLength,
  IsOptional,
} from 'class-validator';
import { RoleModel } from 'src/models/role.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  name: string;
  @IsString()
  @Length(2, 15)
  @IsNotEmpty()
  surname: string;
  @IsString()
  @Length(2, 15)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
