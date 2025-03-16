import type { ITransaction } from "@/types/ITransaction "
import type { UserType } from "@/types/UserType"
import type { Course } from "@/types/Courses"
import { Teacher } from "@/types/Teacher"


// Mock data for teachers
const teachers: Teacher[] = [
    {
      _id: "t1",
      firstName: "Nguyễn",
      lastName: "Văn A",
      address: "Hà Nội, Việt Nam",
      avartar: "/placeholder.svg?height=100&width=100",
      email: "nguyenvana@example.com",
      role: "teacher",
      major: [
        { name: "Mathematics", color: "blue" },
        { name: "Physics", color: "green" },
      ],
      educationLevel: "PhD",
      experienceYears: 10,
      publications: ["Research Paper 1", "Research Paper 2"],
      isActive: true,
      isClose: false,
    },
    {
      _id: "t2",
      firstName: "Trần",
      lastName: "Thị B",
      address: "Hồ Chí Minh, Việt Nam",
      avartar: "/placeholder.svg?height=100&width=100",
      email: "tranthib@example.com",
      role: "teacher",
      major: [
        { name: "Computer Science", color: "purple" },
        { name: "Data Science", color: "red" },
      ],
      educationLevel: "Master",
      experienceYears: 5,
      publications: ["Research Paper 3"],
      isActive: true,
      isClose: false,
    },
  ]
  
  // Mock data for courses
  const courses: Course[] = [
    {
      _id: "c1",
      name: "Introduction to Mathematics",
      description: "A comprehensive introduction to mathematics fundamentals",
      image: "/placeholder.svg?height=200&width=300",
      price: 1500000,
      discount: 100000,
      category: "Mathematics",
      status: true,
      teacherId: teachers[0],
    },
    {
      _id: "c2",
      name: "Advanced Programming",
      description: "Learn advanced programming concepts and techniques",
      image: "/placeholder.svg?height=200&width=300",
      price: 2000000,
      category: "Computer Science",
      status: true,
      teacherId: teachers[1],
    },
    {
      _id: "c3",
      name: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithms",
      image: "/placeholder.svg?height=200&width=300",
      price: 1800000,
      discount: 200000,
      category: "Computer Science",
      status: true,
      teacherId: teachers[1],
    },
  ]
  
  // Mock data for users
  const users: UserType[] = [
    {
      _id: "u1",
      email: "user1@example.com",
      firstName: "Lê",
      lastName: "Văn C",
      address: "Đà Nẵng, Việt Nam",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "student",
      isActive: true,
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-01-15"),
      __v: 0,
    },
    {
      _id: "u2",
      email: "user2@example.com",
      firstName: "Phạm",
      lastName: "Thị D",
      address: "Hải Phòng, Việt Nam",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "student",
      isActive: true,
      createdAt: new Date("2023-02-20"),
      updatedAt: new Date("2023-02-20"),
      __v: 0,
    },
    {
      _id: "u3",
      email: "user3@example.com",
      firstName: "Hoàng",
      lastName: "Văn E",
      address: "Cần Thơ, Việt Nam",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "student",
      isActive: true,
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-03-10"),
      __v: 0,
    },
  ]
  
  // Mock data for transactions
  const transactions: ITransaction[] = [
    {
      _id: "tr1",
      userId: users[0],
      courseId: courses[0],
      amount: 1400000, // Price after discount
      status: "success",
      paymentMethod: "Credit Card",
      transactionRef: "REF123456",
      createdAt: "2023-04-15T08:30:00Z",
      updatedAt: "2023-04-15T08:35:00Z",
    },
    {
      _id: "tr2",
      userId: users[1],
      courseId: courses[1],
      amount: 2000000,
      status: "success",
      paymentMethod: "Bank Transfer",
      transactionRef: "REF234567",
      createdAt: "2023-04-20T10:15:00Z",
      updatedAt: "2023-04-20T10:20:00Z",
    },
    {
      _id: "tr3",
      userId: users[2],
      courseId: courses[2],
      amount: 1600000, // Price after discount
      status: "pending",
      paymentMethod: "E-wallet",
      transactionRef: "REF345678",
      createdAt: "2023-04-25T14:45:00Z",
      updatedAt: "2023-04-25T14:45:00Z",
    },
    {
      _id: "tr4",
      userId: users[0],
      courseId: courses[1],
      amount: 2000000,
      status: "failed",
      paymentMethod: "Credit Card",
      transactionRef: "REF456789",
      createdAt: "2023-04-28T16:20:00Z",
      updatedAt: "2023-04-28T16:25:00Z",
    },
    {
      _id: "tr5",
      userId: users[1],
      courseId: courses[2],
      amount: 1600000, // Price after discount
      status: "success",
      paymentMethod: "E-wallet",
      transactionRef: "REF567890",
      createdAt: "2023-05-02T09:10:00Z",
      updatedAt: "2023-05-02T09:15:00Z",
    },
    {
      _id: "tr6",
      userId: users[2],
      courseId: courses[0],
      amount: 1400000, // Price after discount
      status: "pending",
      paymentMethod: "Bank Transfer",
      transactionRef: "REF678901",
      createdAt: "2023-05-05T11:30:00Z",
      updatedAt: "2023-05-05T11:30:00Z",
    },
    {
      _id: "tr7",
      userId: users[0],
      courseId: courses[2],
      amount: 1600000, // Price after discount
      status: "success",
      paymentMethod: "Credit Card",
      transactionRef: "REF789012",
      createdAt: "2023-05-10T13:45:00Z",
      updatedAt: "2023-05-10T13:50:00Z",
    },
    {
      _id: "tr8",
      userId: users[1],
      courseId: courses[0],
      amount: 1400000, // Price after discount
      status: "failed",
      paymentMethod: "E-wallet",
      transactionRef: "REF890123",
      createdAt: "2023-05-15T15:20:00Z",
      updatedAt: "2023-05-15T15:25:00Z",
    },
    {
      _id: "tr9",
      userId: users[2],
      courseId: courses[1],
      amount: 2000000,
      status: "success",
      paymentMethod: "Bank Transfer",
      transactionRef: "REF901234",
      createdAt: "2023-05-20T09:30:00Z",
      updatedAt: "2023-05-20T09:35:00Z",
    },
    {
      _id: "tr10",
      userId: users[0],
      courseId: courses[0],
      amount: 1400000, // Price after discount
      status: "success",
      paymentMethod: "Credit Card",
      transactionRef: "REF012345",
      createdAt: "2023-05-25T14:15:00Z",
      updatedAt: "2023-05-25T14:20:00Z",
    },
    {
      _id: "tr11",
      userId: users[1],
      courseId: courses[2],
      amount: 1600000, // Price after discount
      status: "pending",
      paymentMethod: "E-wallet",
      transactionRef: "REF123456",
      createdAt: "2023-05-30T11:45:00Z",
      updatedAt: "2023-05-30T11:45:00Z",
    },
    {
      _id: "tr12",
      userId: users[2],
      courseId: courses[1],
      amount: 2000000,
      status: "failed",
      paymentMethod: "Bank Transfer",
      transactionRef: "REF234567",
      createdAt: "2023-06-05T16:30:00Z",
      updatedAt: "2023-06-05T16:35:00Z",
    },
  ]
  
  // Function to simulate fetching transactions from an API
  export async function getTransactions(): Promise<ITransaction[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return transactions
  }
  
  // Function to get a transaction by ID
  export async function getTransactionById(id: string): Promise<ITransaction | undefined> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return transactions.find((transaction) => transaction._id === id)
  }
  
  // Function to get user by ID
  export async function getUserById(id: string): Promise<UserType | undefined> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return users.find((user) => user._id === id)
  }
  
  // Function to get course by ID
  export async function getCourseById(id: string): Promise<Course | undefined> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return courses.find((course) => course._id === id)
  }