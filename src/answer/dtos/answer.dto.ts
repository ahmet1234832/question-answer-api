import { Expose, Transform } from 'class-transformer';
import { QuestionModel } from 'src/models/question.model';
import { UserModel } from 'src/models/user.model';

export class AnswerDto {
  @Expose()
  id: string;
  @Expose()
  header: string;
  @Expose()
  content: string;
  @Expose()
  approved: boolean;
  @Expose()
  createdAt: Date;
  @Expose()
  raise: Number;
  @Expose()
  questionFor: QuestionModel;
  @Expose()
  owner: UserModel;
}
