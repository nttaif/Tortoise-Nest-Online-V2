import type { Course } from "@/types/Courses"
import type { Teacher } from "@/types/Teacher"
import type { UserType } from "@/types/UserType"
import type { ITransaction } from "@/types/ITransaction "

// Mock Teacher
export const mockTeacher: Teacher = {
  _id: "t123456789",
  firstName: "John",
  lastName: "Smith",
  address: "123 Faculty Lane, Academic City",
  avartar: "/placeholder.svg?height=200&width=200",
  email: "john.smith@example.edu",
  role: "teacher",
  major: [
    { name: "Computer Science", color: "#3b82f6" },
    { name: "Web Development", color: "#10b981" },
  ],
  educationLevel: "PhD",
  experienceYears: 8,
  publications: ["Modern Web Development Techniques", "The Future of Online Learning"],
  isActive: true,
  isClose: false,
  createdAt: "2022-01-15T08:00:00.000Z",
  updatedAt: "2023-03-20T10:15:00.000Z",
}

// Mock Course
export const mockCourse: Course = {
  _id: "c987654321",
  name: "Advanced Web Development",
  description:
    "Master modern web development techniques including React, Next.js, and responsive design principles. This comprehensive course covers frontend and backend development.",
  image: "/placeholder.svg?height=400&width=600",
  price: 99.99,
  discount: 15,
  category: "Web Development",
  status: true,
  teacherId: mockTeacher,
  createdAt: "2023-02-10T09:30:00.000Z",
  updatedAt: "2023-05-15T14:45:00.000Z",
}

// Mock User
export const mockUser: UserType = {
  _id: "u567890123",
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
  address: "456 Student Avenue, Learning City",
  avatar: "/placeholder.svg?height=200&width=200",
  role: "student",
  isActive: true,
  createdAt: new Date("2023-01-05T11:20:00.000Z"),
  updatedAt: new Date("2023-06-10T16:30:00.000Z"),
  __v: 0,
}

// Mock Transactions
export const mockTransactions: ITransaction[] = [
  {
    _id: "tr123456",
    userId: mockUser._id,
    courseId: mockCourse._id,
    amount: 84.99, // Price after discount
    status: "Success",
    paymentMethod: "credit-card",
    transactionRef: "TR-1234567890",
    createdAt: "2023-06-15T10:30:00.000Z",
    updatedAt: "2023-06-15T10:32:00.000Z",
  },
  {
    _id: "tr123457",
    userId: mockUser._id,
    courseId: mockCourse._id,
    amount: 84.99,
    status: "Failed",
    paymentMethod: "e-wallet",
    transactionRef: "TR-0987654321",
    createdAt: "2023-06-14T15:45:00.000Z",
    updatedAt: "2023-06-14T15:46:00.000Z",
  },
  {
    _id: "tr123458",
    userId: mockUser._id,
    courseId: mockCourse._id,
    amount: 84.99,
    status: "Pending",
    paymentMethod: "bank-transfer",
    transactionRef: "TR-5678901234",
    createdAt: "2023-06-16T09:15:00.000Z",
    updatedAt: "2023-06-16T09:15:00.000Z",
  },
]

