import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class LogGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const shouldLog = this.reflector.get<boolean>('log', context.getHandler());

    if (shouldLog) {
      console.log('Guard: Logging request at:', new Date().toISOString());
    }

    return true;
  }
}
