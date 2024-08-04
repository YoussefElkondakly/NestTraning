import { applyDecorators, CallHandler, createParamDecorator, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";


export const serializeInterceptor=function(
dto:any
){
    return UseInterceptors(new SerializeInterceptor(dto));
}
export default class  SerializeInterceptor implements NestInterceptor{
  
    constructor(private dto:any){
      
    }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        //the first execution
// console.log(context)

return handler.handle().pipe(
    map(data=>{
    return plainToClass(this.dto,data,{ 
        excludeExtraneousValues: true,//make sure everything works as expected
    });
    })
        )
    }
}
/**
 * 1.take response and turn it to a Dto instance instead of entity
 * 
 * 
 * 
*/