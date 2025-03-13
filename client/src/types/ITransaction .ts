import { Course } from "./Courses";
import { UserType } from "./UserType";

export interface ITransaction {
    _id: string;
    userId: string | UserType; // nếu không populate chỉ là id, nếu populate sẽ là đối tượng IUser
    courseId: string | Course; // tương tự như trên
    amount: number;
    status: 'pending' | 'success' | 'failed';
    paymentMethod?: string;
    transactionRef?: string;
    createdAt: string;
    updatedAt: string;
  }
  