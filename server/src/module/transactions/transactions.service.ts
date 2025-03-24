import { Inject, Injectable, } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { ITransactionRepository } from './repository/transaction.repository';


export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: ITransactionRepository,
  ) {}
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction>{
    return this.transactionRepo.create(createTransactionDto);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepo.findAll();
  }
  
  async findOne(_id: string): Promise<Transaction> {
    return this.transactionRepo.findOne(_id);
  }

  async update(_id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    return this.transactionRepo.update(_id, updateTransactionDto);
  }

  async remove(_id: string): Promise<Transaction> {
    return this.transactionRepo.remove(_id);
  }
}
