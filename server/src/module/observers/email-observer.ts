// observers/email-observer.ts
import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/schemas/transaction.schema';
import { Observer } from './observer.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailObserver implements Observer {
  constructor(private mailerService: MailerService) {}

  async update(transaction: Transaction): Promise<void> {
    if (transaction.status !== 'Success') {
        return;
    }

    const userEmail = transaction.userId['email'];
    const courseName = transaction.courseId['name'] || 'Khóa học của bạn';
    const context = {
        name: transaction.userId['lastName'] || transaction.userId['email'],
        transactionId: transaction._id.toString(),
        courseName: courseName,
        amount: transaction.amount,
        paymentMethod: transaction.paymentMethod,
        status: transaction.status,
    };

    try {
        await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Hóa đơn từ Tortoise Nest Online',
        template: 'invoice',
        context: context,
        });
        console.log(`Đã gửi email hóa đơn đến ${userEmail}`);
    } catch (error) {
        console.error(`Lỗi khi gửi email hóa đơn đến ${userEmail}:`, error);
    }
    }
}