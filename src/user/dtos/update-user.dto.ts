import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  MinLength,
  IsArray,
} from 'class-validator';
import { RoleModel } from 'src/models/role.model';

export class UpdateUserDto {
  @IsString()
  @Length(2, 15)
  @IsOptional()
  name: string;
  @IsString()
  @Length(2, 15)
  @IsOptional()
  surname: string;
  @IsString()
  @Length(2, 15)
  @IsOptional()
  username: string;
  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
  @IsArray()
  @IsOptional()
  roles: RoleModel[];
}
