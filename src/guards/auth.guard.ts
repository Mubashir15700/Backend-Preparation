import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedException('Invalid token format');
    }

    const token = parts[1];

    if (!this.authService.validateUser(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
