import { UserList } from "./component/user-list"
import type { User, Course } from "./types/user"

// Sample data
const sampleCourses: Course[] = [
  {
    _id: "course1",
    name: "Lập trình React.js Nâng cao",
    description: "Khóa học chuyên sâu về React.js",
    image: "/placeholder.svg?height=200&width=300",
    price: 1500000,
    category: "frontend",
    status: true,
    teacherId: "teacher1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "course2",
    name: "Node.js và Express",
    description: "Xây dựng API với Node.js và Express",
    image: "/placeholder.svg?height=200&width=300",
    price: 1200000,
    discount: 200000,
    category: "backend",
    status: true,
    teacherId: "teacher1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "course3",
    name: "Thiết kế UI/UX",
    description: "Nguyên lý thiết kế giao diện người dùng",
    image: "/placeholder.svg?height=200&width=300",
    price: 1800000,
    category: "design",
    status: true,
    teacherId: "teacher2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const sampleUsers: User[] = [
  {
    _id: "teacher1",
    firstName: "Nguyễn",
    lastName: "Văn A",
    address: "Hà Nội, Việt Nam",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "nguyenvana@example.com",
    role: "teacher",
    major: [
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
    ],
    educationLevel: "Tiến sĩ Khoa học Máy tính",
    experienceYears: 8,
    publications: ["Nghiên cứu về hiệu suất React", "Tối ưu hóa Node.js cho ứng dụng quy mô lớn"],
    courses: [sampleCourses[0], sampleCourses[1]],
    isActive: true,
    isClose: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "teacher2",
    firstName: "Trần",
    lastName: "Thị B",
    address: "TP. Hồ Chí Minh, Việt Nam",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "tranthib@example.com",
    role: "teacher",
    major: [
      { name: "UI/UX", color: "#ff7262" },
      { name: "Figma", color: "#a259ff" },
    ],
    educationLevel: "Thạc sĩ Thiết kế",
    experienceYears: 5,
    courses: [sampleCourses[2]],
    isActive: true,
    isClose: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "student1",
    firstName: "Lê",
    lastName: "Văn C",
    address: "Đà Nẵng, Việt Nam",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "levanc@example.com",
    role: "student",
    major: [], // Students don't have major info
    isActive: true,
    isClose: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "student2",
    firstName: "Phạm",
    lastName: "Thị D",
    address: "Cần Thơ, Việt Nam",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "phamthid@example.com",
    role: "student",
    major: [], // Students don't have major info
    isActive: false,
    isClose: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "teacher3",
    firstName: "Hoàng",
    lastName: "Văn E",
    address: "Hải Phòng, Việt Nam",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "hoangvane@example.com",
    role: "teacher",
    major: [
      { name: "Java", color: "#5382a1" },
      { name: "Spring Boot", color: "#6db33f" },
    ],
    educationLevel: "Thạc sĩ Công nghệ thông tin",
    experienceYears: 3,
    publications: [],
    courses: [],
    isActive: true,
    isClose: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function Test() {
  return (
    <main className="container mx-auto py-10">
      <UserList users={sampleUsers} />
    </main>
  )
}

