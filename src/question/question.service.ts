import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from 'src/question/dtos/create-question.dto';
import { QuestionModel } from 'src/models/question.model';
import { UserService } from 'src/user/user.service';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question')
    private readonly questionModel: Model<QuestionModel>,
    private readonly usersService: UserService,
  ) {}
  async create(createQuestionDto: CreateQuestionDto, email: any) {
    const user = await this.usersService.find(email);
    const existingQuestion = await this.find(createQuestionDto.header);
    if (existingQuestion.length == 0) {
      const createdQuestion = new this.questionModel(createQuestionDto);
      createdQuestion.owner = user[0] as UserModel;
      return await createdQuestion.save();
    }
    throw new BadRequestException(
      'This header already exists on another question',
    );
  }
  async findAll() {
    const questions = await this.questionModel.find();
    if (questions.length == 0) {
      throw new NotFoundException('No question was found');
    }
    return questions;
  }
  async find(header: string) {
    const question = await this.questionModel.find({ header });
    return question;
  }
  async findOne(id: string) {
    const question = await this.questionModel.findOne({ id }).exec();
    if (!question) {
      throw new NotFoundException('Question does not exist');
    }
    return question;
  }
  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id);
    Object.assign(question, updateQuestionDto);
    return await question.save();
  }
  async remove(id: string) {
    const question = await this.findOne(id);
    return await question.remove();
  }
  async removeAll(): Promise<any> {
    return await this.questionModel.deleteMany({});
  }
}
