import { Expose, Transform } from 'class-transformer';
import { AnswerModel } from 'src/models/answer.model';
import { UserModel } from 'src/models/user.model';

export class QuestionDto {
  @Expose()
  id: string;
  @Expose()
  header: string;
  @Expose()
  content: string;
  @Expose()
  createdAt: Date;
  @Expose()
  answers: AnswerModel[];
  @Expose()
  @Transform(({ value }) => {
    value._id;
  })
  owner: UserModel;
}
