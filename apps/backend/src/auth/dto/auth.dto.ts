import { IsEmail, IsNotEmpty, max, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}