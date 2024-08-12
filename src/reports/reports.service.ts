import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateReportDto from 'src/dtos/create-report.dto';
import { Repository } from 'typeorm';
import Report from './report.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import User from 'src/users/user.entity';
import GetEstimateDto from 'src/dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }
  async changeApproval(id: number) {
    const report = await this.repo.findOneBy({ id });
    if (!report)
      throw new NotFoundException('No Report Found with the specified Id');
    report.approved = !report.approved;
    return this.repo.save(report);
  }
  getReports(query:GetEstimateDto){
    // this.repo.find({
    //   where: query,
    //   relations: ['user'],
    // });
    return this.repo.createQueryBuilder().select('*').where(
      'make=:make',{make:query.make}
    ).andWhere('mileage=:mileage',{mileage:query.mileage}).getRawMany()
  };
}
