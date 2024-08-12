import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export default class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  make: string;
  @IsString()
  @IsNotEmpty()
  model: string;
  @IsNumber()
  
  @IsNotEmpty()
  @Min(1940)
  @Max(2026)
  year: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  mileage: number;
  @IsLongitude()
  @IsNotEmpty()
  lng: number;
  @IsLatitude()
  @IsNotEmpty()
  lat: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  price: number;
}