import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedToken } from '../interfaces/token.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);