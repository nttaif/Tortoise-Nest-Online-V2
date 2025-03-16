import { Course } from "./Courses";
import { UserType } from "./UserType";

export interface ITransaction {
    _id: string;
    userId: string | UserType;
    courseId: string | Course;
    amount: number;
    status: 'pending' | 'success' | 'failed';//3 trạng thái pending, success, failed viết hoa chữ cái đầu 
    paymentMethod?: string;
    transactionRef?: string;
    createdAt: string;
    updatedAt: string;
  }
  