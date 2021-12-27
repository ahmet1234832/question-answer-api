import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  header: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  content: string;
}
