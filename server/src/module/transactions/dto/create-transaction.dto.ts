import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
   userId: string;
    @IsNotEmpty()
    @IsString()
  courseId: string;
    @IsNotEmpty()
  @IsNumber()
    readonly amount: number;
    @IsOptional()
    @IsString()
    readonly paymentMethod?: string;
    //Mặc định status sẽ là pending khi tạo mới
  }
  