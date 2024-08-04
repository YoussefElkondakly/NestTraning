import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const id = req.session.user;
    const user = await this.usersService.readOne(id);
    if (user) {
      req.user = user;
    }
    return next.handle();
  }
}
