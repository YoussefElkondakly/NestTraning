import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import Report from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import AuthGuard from 'src/guards/auth.guard';
import { UsersModule } from 'src/users/users.module';
import CurrentUserInterceptor from 'src/interceptors/current-user.interceptor';
import CurrentUserMiddleware from 'src/middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Report]),UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService,
    {provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor,}
],
})
export class ReportsModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('reports')  }
}
