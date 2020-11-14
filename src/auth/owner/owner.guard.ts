import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.isOwner(request.url, request.headers.authorization);
  }

  isOwner(url:String, token:string): boolean {
    token = token.replace('Bearer ', '');
    const user = this.jwtService.decode(token);
    const id = url.split('/').pop();
    
    return parseInt(id) == user['id'];
  }
} 