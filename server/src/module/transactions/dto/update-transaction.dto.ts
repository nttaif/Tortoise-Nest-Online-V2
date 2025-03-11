import { IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  status?: 'pending' | 'success' | 'failed';

  @IsOptional()
  @IsString()
  transactionRef?: string;
}
