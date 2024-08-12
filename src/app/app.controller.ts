import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { createSchema, CreateZodDto } from '../dtos/create-zod.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  @UsePipes(new ZodValidationPipe(createSchema))
  wow(@Body() cDto:CreateZodDto){
    return cDto
  }
}
