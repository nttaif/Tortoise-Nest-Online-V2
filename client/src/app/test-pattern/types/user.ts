export type User = {
  _id: string
  firstName: string
  lastName: string
  address: string
  avartar: string
  email: string
  role: string
  major: { name: string; color: string }[]
  educationLevel?: string
  experienceYears?: number
  publications?: string[]
  courses?: Course[]
  isActive: boolean
  isClose: boolean
  createdAt: string
  updatedAt: string
}

export type Course = {
  _id: string
  name: string
  description: string
  image: string
  price: number
  discount?: number
  category: string
  status: boolean
  teacherId: any // Changed from Teacher to any to avoid circular reference
  createdAt: string
  updatedAt: string
}

// Định nghĩa kiểu dữ liệu cho thông tin hiển thị
export type UserDisplayData = {
  basicInfo: {
    name: string
    email: string
    address: string
  }
  teacherInfo?: {
    educationLevel?: string
    experienceYears?: number
    major: { name: string; color: string }[]
    publications?: string[]
    courses?: Course[]
  }
  status: {
    isActive: boolean
    isExperienced?: boolean
  }
}

