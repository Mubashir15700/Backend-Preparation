import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(token: string): boolean {
    return token === 'valid-token';
  }
}
