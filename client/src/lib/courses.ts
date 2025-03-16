import { getAllCourses } from "@/components/common/action"
import type { Course } from "@/types/Courses"
// Interface for pagination results
export interface PaginatedCourses {
  courses: Course[]
  totalCourses: number
  totalPages: number
  currentPage: number
}

// This is a server-side function to fetch courses with pagination
export async function getCourses(page = 1, limit = 10): Promise<PaginatedCourses> {
  // In a real application, you would fetch from your database or API
  // For now, we'll return mock data

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const mockCourses = await getAllCourses() || []
  const paginatedCourses = mockCourses.slice(startIndex, endIndex)
  const totalPages = Math.ceil(mockCourses.length / limit)

  return {
    courses: paginatedCourses,
    totalCourses: mockCourses.length,
    totalPages,
    currentPage: page,
  }
}

// Function to get a course by ID
export async function getCourseById(id: string): Promise<Course | undefined> {
  // In a real application, you would fetch from your database or API
  // For now, we'll return mock data

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const mockCourses = await getAllCourses() || []
  return mockCourses.find((course) => course._id === id)
}
