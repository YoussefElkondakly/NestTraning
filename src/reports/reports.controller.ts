import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import AuthGuard from 'src/guards/auth.guard';
import CreateReportDto from 'src/dtos/create-report.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import User from 'src/users/user.entity';
import { serializeInterceptor } from 'src/interceptors/serialize.interceptor';
import ReportDto from 'src/dtos/report.dto';
import AdminGuard from 'src/guards/admin.guard';
import GetEstimateDto from 'src/dtos/get-estimate.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @serializeInterceptor(ReportDto)
  createReport(@Body() report: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(report, user);
  }
  @Get()
  getReports(@Query() filter: GetEstimateDto) {
    return this.reportsService.getReports(filter);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.changeApproval(id);
  }
}
