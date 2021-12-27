import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  header: string;
  @IsString()
  @IsOptional()
  @MinLength(30)
  content: string;
}
