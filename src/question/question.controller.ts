import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { User } from 'src/decorators/user.decorator';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserModel } from 'src/models/user.model';
import { CreateQuestionDto } from 'src/question/dtos/create-question.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { QuestionDto } from './dtos/question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionsService: QuestionService) {}
  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req: Request,
  ) {
    const user = req.currentUser;
    return await this.questionsService.create(createQuestionDto, user.email);
  }
  @Get()
  async findAllQuestions() {
    return await this.questionsService.findAll();
  }
  @Roles('admin')
  @Delete()
  async deleteAllQuestions() {
    return await this.questionsService.removeAll();
  }
  @Get(':id')
  async findQuestion(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async removeQuestion(@Param('id') id: string, @User() user: UserModel) {
    return await this.questionsService.remove(id);
  }
}
