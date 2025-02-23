import { Teacher } from "./Teacher"
export type Course = {
    _id: string
    name: string
    description: string
    image: string
    price: number
    discount?: number
    status: boolean
    teacherId: Teacher
  }
  