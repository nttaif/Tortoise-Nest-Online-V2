import { User } from "../schemas/user.schema";
import { Types } from 'mongoose';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  findAll(query: any, skip: number, limit: number, sort: any): Promise<User[]>;
  countDocuments(query: any): Promise<number>;
  update(id: string, updateData: Partial<User>): Promise<User | null>;
  findByIdAndUpdate(id: string, updateData: Partial<User>): Promise<User | null>;
  exists(email: string): Promise<{ _id: Types.ObjectId } | null>;
}