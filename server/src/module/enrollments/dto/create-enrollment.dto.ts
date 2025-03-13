import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  readonly courseId: Types.ObjectId;
  // Giá trị mặc định là pending nếu không có transaction liên quan
  @IsOptional()
  @IsString()
  readonly enrollmentStatus?: 'pending' | 'active' | 'cancelled';
  @IsOptional()
  @IsString()
  readonly transactionId?: Types.ObjectId;
}
