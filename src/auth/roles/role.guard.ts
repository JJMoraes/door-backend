import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/enum/user-role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Role>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return this.matchRoles(role, request.headers.authorization);
  }

  matchRoles(role:Role, token:string): boolean{
    token = token.replace('Bearer ', '');
    const user = this.jwtService.decode(token);
    return role[0] === user['role'];
  }
} 