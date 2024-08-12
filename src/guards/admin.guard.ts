import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";



export default class AdminGuard implements CanActivate {
    constructor(private reflector:Reflector){}
  canActivate(context: ExecutionContext): boolean {
    
    const request = context.switchToHttp().getRequest();
    console.log(request.user)
    if (!request.user)return false
        
return request.user.admin;
  }
}
