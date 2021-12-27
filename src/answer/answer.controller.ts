import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserModel } from 'src/models/user.model';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dtos/answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@Serialize(AnswerDto)
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':id')
  async createAnswer(
    @Param('id') id: string,
    @Body() createanswerDto: CreateAnswerDto,
    @User() user: UserModel,
  ) {
    return await this.answerService.create(id, createanswerDto, user);
  }

  @Get()
  async findAll() {
    return await this.answerService.find();
  }

  @Delete('/:questionId/:answerId')
  async removeAnswer(@Param() params) {
    return await this.answerService.remove(params.questionId, params.answerId);
  }
}
