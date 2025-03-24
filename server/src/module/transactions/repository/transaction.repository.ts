import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction, TransactionDocument } from "../schemas/transaction.schema";
import { Model, Types } from "mongoose";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";


//Create interface for TransactionRepository
export interface ITransactionRepository {
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: string): Promise<Transaction>;
}

//Create TransactionRepositoryImpl class and implement TransactionRepository interface
@Injectable()
export class TransactionRepositoryImpl implements ITransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel({
      ...createTransactionDto,
      userId: new Types.ObjectId(createTransactionDto.userId),
      courseId: new Types.ObjectId(createTransactionDto.courseId),
    });
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel
      .find()
      .populate('userId', '-password')
      .populate('courseId')
      .exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('userId', '-password')
      .populate('courseId')
      .exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      updateTransactionDto,
      { new: true },
    ).exec();
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return updatedTransaction;
  }

  async remove(id: string): Promise<Transaction> {
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(id).exec();
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return deletedTransaction;
  }
}