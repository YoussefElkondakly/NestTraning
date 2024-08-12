import { Transform } from 'class-transformer';
import {
    IsEmpty,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export default class GetEstimateDto {
  @IsString()
  make: string;
//   @IsString()
//   model: string;
//   @Transform(({ value }) => parseInt(value))
//   @IsNumber()
//   @Min(1940)
//   @Max(2026)
//   year: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
//   @Transform(({ value }) => parseFloat(value))
//   @IsLongitude()
//   lng: number;
//   @Transform(({ value }) => parseFloat(value))
//   @IsLatitude()
//   lat: number;
}