import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from 'src/models/answer.model';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }]),
    QuestionModule,
    UserModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
