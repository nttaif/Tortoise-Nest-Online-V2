import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction>{
    const createdTransaction = new this.transactionModel({
      ...createTransactionDto,
      userId: new Types.ObjectId(createTransactionDto.userId),
      courseId: new Types.ObjectId(createTransactionDto.courseId),
    });
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find()
      .populate('userId', '-password')
      .populate('courseId')
      .exec();
  }

  async findOne(_id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(_id)
      .populate('userId', '-password')
      .populate('courseId')
      .exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${_id} not found`);
    }
    return transaction;
  }

  async update(_id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      _id,
      updateTransactionDto,
      { new: true },
    ).exec();
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with id ${_id} not found`);
    }
    return updatedTransaction;
  }

  async remove(_id: string): Promise<Transaction> {
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(_id).exec();
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with id ${_id} not found`);
    }
    return deletedTransaction;
  }
}
