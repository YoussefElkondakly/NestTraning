import { Expose, Transform } from 'class-transformer';
import User from 'src/users/user.entity';

export default class ReportDto {
  @Expose()
  
  id: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  mileage: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  price: number;
  @Transform(
    ({
      obj, //originalReportEntity
    }) => obj.user.id,
  )
  @Expose()
  userId: number;
  @Expose()
  approved:boolean;
}
