import { Lesson } from "./Lesson"
import { Teacher } from "./Teacher"
export type Course = {
    _id: string
    name: string
    description: string
    image: string
    price: number
    discount?: number
    lessons?: Lesson[]
    category: string
    status: boolean
    teacherId:  Teacher
    createdAt: string;
    updatedAt: string;
  }
  