import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class Response {
@IsString()
  fistName: string;
@IsString()
  lastName: string;
@IsBoolean()
  isActive: boolean;
@IsEmail()
  email: string;
}