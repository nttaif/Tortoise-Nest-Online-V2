import { Inject, Injectable, } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { ITransactionRepository } from './repository/transaction.repository';
import { Observer } from '../observers/observer.interface';


export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

@Injectable()
export class TransactionsService {
  private observers: Observer[] = [];
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: ITransactionRepository,
  ) {
    console.log('TransactionsService initialized. Observers:', this.observers.length);
  }

  // Observer pattern methods
  registerObserver(observer: Observer): void {
    this.observers.push(observer);
     console.log(`Registered observer: ${observer.constructor.name}`);
  }
  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  private notifyObservers(transaction: Transaction): void {
    console.log('Notifying observers...', this.observers.length);
    this.observers.forEach(observer => {
      console.log(`Calling update on observer: ${observer.constructor.name}`);
      observer.update(transaction);
    });
  }
  async getTransaction(_id: string): Promise<Transaction> {
    const populatedTransaction = await this.transactionRepo.findOneWithPopulate(_id, [
      'userId',
      'courseId',
    ]);
    return populatedTransaction;
  }
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
    const updatedTransaction = await this.transactionRepo.update(_id, updateTransactionDto);
    const populatedTransaction = await this.transactionRepo.findOneWithPopulate(_id, [
      'userId',
      'courseId',
    ]);
    console.log(`Calling update on Transaction: ${populatedTransaction._id}`);
    console.log('Before notifying, observers count:', this.observers.length);
    this.notifyObservers(populatedTransaction);
    return populatedTransaction;
  }

  async remove(_id: string): Promise<Transaction> {
    return this.transactionRepo.remove(_id);
  }
}
