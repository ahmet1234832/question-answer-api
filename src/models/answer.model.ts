import * as mongoose from 'mongoose';
import { QuestionModel } from './question.model';
import { UserModel } from './user.model';

export class AnswerModel {
  header: string;
  content: string;
  approved: boolean;
  raise: Number;
  createdAt: Date;
  owner: UserModel;
  questionFor: QuestionModel;
}

export const AnswerSchema = new mongoose.Schema({
  header: { type: String, required: [true, 'A question must have a header!'] },
  content: {
    type: String,
    required: [true, 'A question must have a content!'],
    minlength: [
      30,
      "I don't think you can express youself less then 30 characters.",
    ],
    maxlength: [100, 'Hundred characters is more than enough!'],
  },
  approved: { type: Boolean, default: false },
  owner: { type: Object },
  createdAt: { type: Date, default: Date.now() },
  raise: { type: Number, default: 0 },
});
