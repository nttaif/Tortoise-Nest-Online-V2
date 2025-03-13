// transaction.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Transaction {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending', enum: ['pending', 'success', 'failed'] })
  status: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  transactionRef?: string; //mã tham chiếu từ cổng thanh toán
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
