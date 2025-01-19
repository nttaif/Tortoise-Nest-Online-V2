import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enum/role.enum';
import { ROLES_KEY } from '../decorator/role.decorator';

/*
    - Get list roles from metadata
    - If no roles are defined, allow access
    - Get data user from request 
    - Get user groups from conito:groups in token
    - Check if the user has the appropriate permissions for the required role
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, //get metadata (role) from decorators
  ) {}
  canActivate(context: ExecutionContext): boolean {
    //Get list roles from metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    //If no roles are defined, allow access
    if (!requiredRoles) {
      return true;
    }
    //Get data user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    //Get user groups from conito:groups in token
    const userGroups = user?.['cognito:groups'] || [];
    if (!userGroups.length) {
      throw new ForbiddenException('User does not belong to any group');
    }
    //Check if user is SUPER_ADMIN, bypass other checks
    if (userGroups.includes(UserRole.SUPER_ADMIN)) {
      return true;
    }
    //Check if the user has the appropriate permissions for the required role
    const hasRole = requiredRoles.some((role) => userGroups.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
