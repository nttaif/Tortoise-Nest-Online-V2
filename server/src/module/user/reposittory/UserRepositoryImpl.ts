import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(query: any, skip: number, limit: number, sort: any): Promise<User[]> {
    return this.userModel.find(query).skip(skip).limit(limit).sort(sort).exec();
  }

  async countDocuments(query: any): Promise<number> {
    return this.userModel.countDocuments(query).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async findByIdAndUpdate(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async exists(email: string): Promise<{ _id: Types.ObjectId } | null> {
    return this.userModel.exists({ email });
  }
}