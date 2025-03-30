import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment,EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';
import { Transaction } from '../transactions/schemas/transaction.schema';
import { Observer } from './observer.interface';

@Injectable()
export class EnrollmentUpdater implements Observer {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async update(transaction: Transaction): Promise<void> {
    const enrollment = await this.enrollmentModel.findOne({ transactionId: transaction._id });
    if (!enrollment) {
      console.log('No enrollment found for this transaction');
      return;
    }
    if (transaction.status === 'Success') {
      enrollment.enrollmentStatus = 'active';
    } else if (transaction.status === 'Failed') {
      enrollment.enrollmentStatus = 'cancelled';
    }
    await enrollment.save();
    console.log(`Updated enrollment status to ${enrollment.enrollmentStatus}`);
  }
}