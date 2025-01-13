import { IsString, IsBoolean, IsEmail } from 'class-validator';
import { Date, ObjectId, Types } from 'mongoose';

export class ResponseUser {
@IsString()
  _id: Types.ObjectId;
@IsString()
  fistName: string;
@IsString()
  lastName: string;
@IsBoolean()
  isActive: boolean;
@IsEmail()
  email: string;
@IsString()
  createdAt: string;
@IsString()
  updatedAt: string;
  @IsString()
  __v: number
}