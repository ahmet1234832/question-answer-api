import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QuestionService } from 'src/question/question.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuestionOwnerMiddleware implements NestMiddleware {
  constructor(
    private readonly questionService: QuestionService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.currentUser) {
      const userId = req.currentUser['_id'];
      const questionId = req.params['id'];

      const user = await this.userService.findOne(userId);
      const question = await this.questionService.findOne(questionId);
      if (question.owner.email == user.email) {
        next();
      } else {
        throw new BadRequestException('This question does not belong to you');
      }
    } else {
      next();
    }
  }
}
