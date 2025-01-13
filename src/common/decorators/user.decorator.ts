import { createParamDecorator } from "@nestjs/common";

import { ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    return {
      ...request.user,
      accessToken: token
    };
  },
);