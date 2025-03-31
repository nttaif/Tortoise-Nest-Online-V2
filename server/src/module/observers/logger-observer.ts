import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/schemas/transaction.schema';
import { Observer } from './observer.interface';

@Injectable()
export class LoggerObserver implements Observer {
  update(transaction: Transaction): void {
    console.log(`Transaction ${transaction._id} updated to status: ${transaction.status}`);
  }
}