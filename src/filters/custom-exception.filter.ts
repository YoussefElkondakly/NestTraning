import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(ex:HttpException,host:ArgumentsHost){
        const req=host.switchToHttp().getRequest<Request>()
        const res=host.switchToHttp().getResponse<Response>()
        const status=ex.getStatus()
        res.status(status).json({
            status,
            message:ex.getResponse()['message'],
      
        })
    }
}