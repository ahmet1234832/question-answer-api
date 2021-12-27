import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserModel } from 'src/models/user.model';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  header: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
