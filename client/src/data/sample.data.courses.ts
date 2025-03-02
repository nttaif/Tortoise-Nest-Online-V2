import { Course } from "@/types/Courses"
import { Teacher } from "@/types/Teacher"

export const sampleTeachers: Teacher[] = [
  {
    _id: "t1",
    firstName: "John",
    lastName: "Smith",
    address: "123 Education St, Teaching City",
    avartar: "/images/taihocbai.jpg?height=40&width=40",
    email: "john.smith@example.com",
    role: "Senior Lecturer",
    major: [
      { name: "Web Development", color: "#22C55E" },
      { name: "JavaScript", color: "#EAB308" }
    ],
    educationLevel: "Ph.D in Computer Science",
    experienceYears: 8,
    publications: [
      "Modern Web Development Practices",
      "JavaScript Design Patterns"
    ],
    isActive: true,
    isClose: false
  },
  {
    _id: "t2",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "456 Learning Ave, Knowledge Town",
    avartar: "/images/taihocbai.jpg?height=40&width=40",
    email: "sarah.johnson@example.com",
    role: "UI/UX Specialist",
    major: [
      { name: "UI Design", color: "#EC4899" },
      { name: "User Experience", color: "#8B5CF6" }
    ],
    educationLevel: "Master in Design",
    experienceYears: 6,
    isActive: true,
    isClose: false
  },
  {
    _id: "t3",
    firstName: "Michael",
    lastName: "Chen",
    address: "789 Tech Road, Innovation City",
    avartar: "/images/taihocbai.jpg?height=40&width=40",
    email: "michael.chen@example.com",
    role: "React Expert",
    major: [
      { name: "React", color: "#3B82F6" },
      { name: "TypeScript", color: "#06B6D4" }
    ],
    educationLevel: "Master in Software Engineering",
    experienceYears: 5,
    publications: ["React Performance Optimization"],
    isActive: true,
    isClose: false
  }
]

export const sampleCourses: Course[] = [
  {
    id: "1",
    name: "Complete Web Development Bootcamp",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js",
    image: "/images/taihocbai.jpg?height=200&width=300",
    price: 99.99,
    discount: 20,
    status: true,
    teacherId: sampleTeachers[0]
  },
  {
    id: "2",
    name: "UI/UX Design Fundamentals",
    description: "Master the principles of user interface and user experience design",
    image: "/images/taihocbai.jpg?height=200&width=300",
    price: 89.99,
    status: true,
    teacherId: sampleTeachers[1]
  },
  {
    id: "3",
    name: "Advanced React and Redux",
    description: "Deep dive into React ecosystem with Redux, Hooks, and best practices",
    image: "/placeholder.svg?height=200&width=300",
    price: 129.99,
    discount: 15,
    status: true,
    teacherId: sampleTeachers[2]
  }
]
