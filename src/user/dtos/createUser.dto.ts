import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MaxLength(20)
  @MinLength(6)
  password: string;

  @MinLength(3)
  avatar: string;
}
