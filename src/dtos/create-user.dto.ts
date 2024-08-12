import {  IsEmail, IsNotEmpty, IsString } from "class-validator"
import { PasswordMatch } from "../decorators/password-match.decorator";

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @PasswordMatch('password',{message:'Password Does not match'})
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
};