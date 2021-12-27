import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerModel } from 'src/models/answer.model';
import { UserModel } from 'src/models/user.model';
import { QuestionService } from 'src/question/question.service';
import { UserService } from 'src/user/user.service';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel('Answer') private readonly answerModel: Model<AnswerModel>,
    private readonly questionService: QuestionService,
    private readonly usersService: UserService,
  ) {}

  async create(
    questionId: string,
    createAnswerDto: CreateAnswerDto,
    user: UserModel,
  ) {
    const newAnswer = await new this.answerModel(createAnswerDto);
    const question = await this.questionService.findOne(questionId);

    question.answers.push(newAnswer);
    newAnswer.owner = user;
    newAnswer.questionFor = question;
    await newAnswer.save();
    return await question.save();
  }

  async findOne(id: string) {
    const answer = await this.answerModel.findById({ id }).exec();
    if (!answer) {
      throw new NotFoundException('This answer does not exist');
    }
    return answer;
  }

  async find() {
    const answers = await this.answerModel.find().exec();
    if (answers.length > 0) {
      return answers;
    }
    throw new NotFoundException('No answer is found');
  }

  async remove(questionId: string, answerId: string) {
    const question = await this.questionService.findOne(questionId);
    const answer = await this.answerModel.findById({ _id: questionId });
  }
}
