import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SignInUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;

}
