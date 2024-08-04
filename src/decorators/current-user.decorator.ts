import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    data: never,
    context: ExecutionContext, //A wrapper around the incoming request
  ) => {
    //produce some information
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
