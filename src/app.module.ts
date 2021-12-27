import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './user/middlewares/current-user.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { QuestionOwnerMiddleware } from './middlewares/question-owner.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    QuestionModule,
    AnswerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
    consumer.apply(QuestionOwnerMiddleware).forRoutes({
      path: 'questions/:id',
      method: RequestMethod.PUT && RequestMethod.DELETE,
    });
  }
}
