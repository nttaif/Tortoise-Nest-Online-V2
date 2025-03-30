import type { Course } from "@/types/Courses"
import type { Lesson } from "@/types/Lesson"
import { getCourseById } from "./sample.data.courses"

// Function to get all courses for a teacher
export async function getTeacherCourses(teacherId: string): Promise<{
  activeCourses: Course[]
  draftCourses: Course[]
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would fetch from an API
  // For now, we'll use the mock data from courses.ts

  // Get all courses
  const allCourses = await Promise.all(
    ["67d664c2b90b8dbec6d342ed", "67d664c2b90b8dbec6d342ee", "67d664c2b90b8dbec6d342ef", 
     "67d664c2b90b8dbec6d342f0", "67d664c2b90b8dbec6d342f1", "67d664c2b90b8dbec6d342f2"]
      .map(async (id) => await getCourseById(id)),
  )

  // Filter for this teacher and add some extra data
  const teacherCourses = allCourses
    .filter((course) => course && typeof course.teacherId === "object" && course.teacherId._id === teacherId)
    .map((course) => {
      if (!course) return null

      // Add enrollment count (mock data)
      const enrollmentCount = Math.floor(Math.random() * 50)

      // Count schedules
      const schedulesCount =
        course.lessons?.reduce((acc, lesson) => {
          return acc + (lesson.scheduledTime?.length || 0)
        }, 0) || 0

      return {
        ...course,
        enrollmentCount,
        schedulesCount,
      }
    })
    .filter(Boolean) as (Course & { enrollmentCount: number; schedulesCount: number })[]

  // Split into active and draft courses
  const activeCourses = teacherCourses.filter((course) => course.status)
  const draftCourses = teacherCourses.filter((course) => !course.status)

  return { activeCourses, draftCourses }
}

// Function to get all lessons for a course
export async function getCourseLessons(courseId: string): Promise<Lesson[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // In a real app, this would fetch from an API
  const course = await getCourseById(courseId)

  if (!course || !course.lessons) {
    return []
  }

  return course.lessons
}
