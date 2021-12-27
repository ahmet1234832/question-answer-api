import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  constructor(private reflector = new Reflector()) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRules = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;
    let isAllowed: boolean;
    if (!allowedRules) {
      return true;
    }

    const allUsersRoles = [];

    user.roles.map(async (role) => {
      await allUsersRoles.push(role);
    });

    allowedRules.map((rule) => {
      allUsersRoles.includes(rule) ? (isAllowed = true) : (isAllowed = false);
    });
    console.log('hi from admin guard');
    return isAllowed;
  }
}
