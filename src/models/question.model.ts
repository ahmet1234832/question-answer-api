import * as mongoose from 'mongoose';
import { AnswerModel } from './answer.model';
import { UserModel } from './user.model';

export class QuestionModel {
  header: string;
  content: string;
  createdAt: Date;
  answers: AnswerModel[];
  owner: UserModel;
}

export const QuestionSchema = new mongoose.Schema({
  header: { type: String, required: [true, 'A question must have a header!'] },
  content: {
    type: String,
    required: [true, 'A question must have a content!'],
    minlength: [
      30,
      "I don't think you can express yourself less then 30 characters.",
    ],
    maxlength: [100, 'Hundred characters is more than enough!'],
  },
  createdAt: { type: Date, default: Date.now() },
  answers: { type: Array },
  owner: { type: Object },
});
