import { Course } from "./Courses";
import { ITransaction } from "./ITransaction ";
import { UserType } from "./UserType";

export interface IEnrollment {
    _id: string;
    userId: string | UserType;
    courseId: string | Course;
    enrollmentStatus: 'pending' | 'active' | 'cancelled';
    transactionId?: string | ITransaction;
    createdAt: string;
    updatedAt: string;
  }
  