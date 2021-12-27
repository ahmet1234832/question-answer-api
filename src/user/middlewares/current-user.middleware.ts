import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken';
import { UserModel } from 'src/models/user.model';

declare module 'express-session' {
  interface Session {
    token: any;
    currentUser?: any;
  }
}
declare global {
  namespace Express {
    interface Request {
      token: any;
      currentUser?: UserModel;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.session || {};
    if (token) {
      const { user } = jwt.verify(token, 'highwaytohell');
      req.currentUser = user[0];
    }
    next();
  }
}
