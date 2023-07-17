import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  email: string;

  @MaxLength(20)
  @MinLength(6)
  password: string;
}
