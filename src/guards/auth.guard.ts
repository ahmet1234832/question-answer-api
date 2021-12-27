import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      !request.route.path.includes('signIn') &&
      !request.route.path.includes('signUp')
    ) {
      if (request.currentUser) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You have to logIn to access this route',
        );
      }
    }
    return true;
  }
}
