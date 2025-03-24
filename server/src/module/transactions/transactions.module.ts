import { Module } from '@nestjs/common';
import { TRANSACTION_REPOSITORY, TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import {TransactionRepositoryImpl } from './repository/transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionRepositoryImpl,
    },
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
