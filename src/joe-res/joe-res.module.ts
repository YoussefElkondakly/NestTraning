import { Module } from '@nestjs/common';
import { JoeResService } from './joe-res.service';
import { JoeResController } from './joe-res.controller';

@Module({
  controllers: [JoeResController],
  providers: [JoeResService],
})
export class JoeResModule {}
