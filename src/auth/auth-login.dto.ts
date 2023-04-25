import { IsEmail, IsEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsEmpty()
  password: string;
}
