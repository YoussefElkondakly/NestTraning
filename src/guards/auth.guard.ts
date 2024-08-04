import { CanActivate, ExecutionContext } from "@nestjs/common";

export default class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.session.user
    }
}