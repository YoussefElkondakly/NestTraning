import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import User from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
declare global{
    namespace Express {
        interface Request{
            user?:User
        }
    }
}

@Injectable()
export default class CurrentUserMiddleware implements NestMiddleware{
    constructor(private userService:UsersService){}
    async use(req:Request,res:Response,next:NextFunction){
const userId=req.session.user
if(!userId)throw new BadRequestException("You are not logged in please login")
    const user=await this.userService.readOne(userId)
if(!userId)throw new BadRequestException("There is an internal problem")
req.user=user
next()
    }
}