// enrollment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Enrollment {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  //Trạng thái đăng ký: pending (chờ thanh toán), active (đã xác nhận) hoặc cancelled (hủy)
  @Prop({ default: 'pending', enum: ['pending', 'active', 'cancelled']})
  enrollmentStatus: string;

  @Prop({ type: Types.ObjectId, ref: 'Transaction' })
  transactionId?: Types.ObjectId;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
