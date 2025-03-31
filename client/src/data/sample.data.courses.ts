import type { Course } from "@/types/Courses"
import type { Lesson, LessonContent } from "@/types/Lesson"
import type { Teacher } from "@/types/Teacher"

// Mock teachers data
const mockTeachers: Teacher[] = [
  {
    _id: "67d65ff8b90b8dbec6d342a5",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "john.doe@example.com",
    role: "teacher",
    major: [{ name: "Computer Science", color: "blue" }],
    educationLevel: "Ph.D. in Computer Science",
    experienceYears: 8,
    publications: ["Advanced React Patterns", "Next.js for Enterprise"],
    isActive: true,
    isClose: false,
    createdAt: "2025-03-20T10:30:45.123Z",
    updatedAt: "2025-03-20T10:30:45.123Z",
  },
  {
    _id: "67d65ff8b90b8dbec6d342a6",
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Oak St",
    avartar: "/placeholder.svg?height=200&width=200",
    email: "jane.smith@example.com",
    role: "teacher",
    major: [{ name: "Design", color: "purple" }],
    educationLevel: "Master's in Graphic Design",
    experienceYears: 5,
    isActive: true,
    isClose: false,
    createdAt: "2025-03-20T11:15:22.456Z",
    updatedAt: "2025-03-20T11:15:22.456Z",
  },
]

// Mock lesson content
const createLessonContents = (lessonId: string, contentCount = 3): LessonContent[] => {
  const contents: LessonContent[] = []

  for (let i = 0; i < contentCount; i++) {
    const isVideo = i % 2 === 0
    const contentId = `${lessonId}-content-${i}`
    contents.push({
      _id: contentId,
      title: isVideo ? `Video ${i + 1}` : `Document ${i + 1}`,
      description: `Description for ${isVideo ? "video" : "document"} ${i + 1}`,
      contentType: isVideo ? "video" : "document",
      url: isVideo ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" : "#",
      documentType: !isVideo ? (i % 3 === 0 ? "pdf" : i % 3 === 1 ? "word" : "ppt") : undefined,
      duration: isVideo ? 10 + i * 5 : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  return contents
}

// Create upcoming dates for schedules
const createUpcomingDate = (daysFromNow: number, hour: number = 10): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(hour, 0, 0, 0)
  return date.toISOString()
}

// Mock lessons
const createLessons = (courseId: string, lessonCount = 5): Lesson[] => {
  const lessons: Lesson[] = []

  for (let i = 0; i < lessonCount; i++) {
    const lessonId = `67e4134b57885d8aac95f${i + 2}e8`
    
    // Create scheduled times with realistic dates
    const scheduledTimes = []
    if (i < 2) {
      // Past schedule (for testing)
      scheduledTimes.push({
        _id: `67e4134b57885d8aac95f${i + 2}ea`,
        lessonId,
        teacherId: "67d65ff8b90b8dbec6d342a5",
        startTime: "2023-10-01T10:00:00.000Z",
        endTime: "2023-10-01T11:00:00.000Z",
        meetingId: `meeting-${i}-past`,
        status: "completed",
        createdAt: "2025-03-20T14:46:35.813Z",
        updatedAt: "2025-03-20T14:46:35.813Z",
      })
    }
    
    // Today's schedule
    if (i === 0) {
      const today = new Date()
      today.setHours(10, 0, 0, 0)
      const endTime = new Date(today)
      endTime.setHours(11, 0, 0, 0)
      
      scheduledTimes.push({
        _id: `67e4134b57885d8aac95f${i + 3}ea`,
        lessonId,
        teacherId: "67d65ff8b90b8dbec6d342a5",
        startTime: today.toISOString(),
        endTime: endTime.toISOString(),
        meetingId: `meeting-${i}-today`,
        status: "scheduled",
        createdAt: "2025-03-26T14:46:35.813Z",
        updatedAt: "2025-03-26T14:46:35.813Z",
      })
    }
    
    // Future schedules
    scheduledTimes.push({
      _id: `67e4134b57885d8aac95f${i + 4}ea`,
      lessonId,
      teacherId: "67d65ff8b90b8dbec6d342a5",
      startTime: createUpcomingDate(i + 1),
      endTime: createUpcomingDate(i + 1, 11),
      meetingId: `meeting-${i}-future`,
      status: "scheduled",
      createdAt: "2025-03-26T14:46:35.813Z",
      updatedAt: "2025-03-26T14:46:35.813Z",
    })

    lessons.push({
      _id: lessonId,
      courseId,
      title: i === 0 ? "Introduction to React" : 
             i === 1 ? "React Components and Props" :
             i === 2 ? "State and Lifecycle" :
             i === 3 ? "Handling Events" : `Advanced Topic ${i}`,
      description: i === 0 ? "Learn the basics of React and how to create components" :
                  i === 1 ? "Understanding components, props, and composition" :
                  i === 2 ? "Working with state and component lifecycle methods" :
                  i === 3 ? "How to handle events in React applications" : 
                  `Description for lesson ${i + 1}`,
      contents: createLessonContents(lessonId, 2 + i),
      order: i + 1,
      scheduledTime: scheduledTimes as any,
      createdAt: "2025-03-26T14:46:35.816Z",
      updatedAt: "2025-03-26T14:46:35.816Z",
    })
  }

  return lessons
}

// Mock courses data
const mockCourses: Course[] = [
  {
    _id: "67d664c2b90b8dbec6d342ed",
    name: "Complete React Developer Course",
    description: "Learn React from scratch and build modern web applications with hooks, context, and more.",
    image: "/placeholder.svg?height=400&width=600",
    price: 99.99,
    discount: 20,
    category: "programming",
    status: true,
    teacherId: mockTeachers[0],
    lessons: createLessons("67d664c2b90b8dbec6d342ed", 5),
    createdAt: "2025-03-20T12:30:45.123Z",
    updatedAt: "2025-03-20T12:30:45.123Z",
  },
  {
    _id: "67d664c2b90b8dbec6d342ee",
    name: "UI/UX Design Masterclass",
    description: "Master the principles of UI/UX design and create beautiful, user-friendly interfaces.",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "design",
    status: true,
    teacherId: mockTeachers[1],
    lessons: createLessons("67d664c2b90b8dbec6d342ee", 4),
    createdAt: "2025-03-20T13:15:22.456Z",
    updatedAt: "2025-03-20T13:15:22.456Z",
  },
  {
    _id: "67d664c2b90b8dbec6d342ef",
    name: "Next.js for Production",
    description: "Build scalable, production-ready applications with Next.js and deploy them to Vercel.",
    image: "/placeholder.svg?height=400&width=600",
    price: 129.99,
    discount: 15,
    category: "programming",
    status: true,
    teacherId: mockTeachers[0],
    lessons: createLessons("67d664c2b90b8dbec6d342ef", 6),
    createdAt: "2025-03-20T14:45:33.789Z",
    updatedAt: "2025-03-20T14:45:33.789Z",
  },
  {
    _id: "67d664c2b90b8dbec6d342f0",
    name: "Digital Marketing Fundamentals",
    description: "Learn the basics of digital marketing, including SEO, social media, and email marketing.",
    image: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    category: "marketing",
    status: true,
    teacherId: mockTeachers[1],
    lessons: createLessons("67d664c2b90b8dbec6d342f0", 3),
    createdAt: "2025-03-20T15:20:11.234Z",
    updatedAt: "2025-03-20T15:20:11.234Z",
  },
  {
    _id: "67d664c2b90b8dbec6d342f1",
    name: "Photography Basics",
    description: "Learn the fundamentals of photography, including composition, lighting, and editing.",
    image: "/placeholder.svg?height=400&width=600",
    price: 69.99,
    category: "photography",
    status: true,
    teacherId: mockTeachers[1],
    lessons: createLessons("67d664c2b90b8dbec6d342f1", 4),
    createdAt: "2025-03-20T16:10:45.678Z",
    updatedAt: "2025-03-20T16:10:45.678Z",
  },
  {
    _id: "67d664c2b90b8dbec6d342f2",
    name: "Business Strategy",
    description: "Learn how to develop and implement effective business strategies for growth and success.",
    image: "/placeholder.svg?height=400&width=600",
    price: 109.99,
    discount: 10,
    category: "business",
    status: true,
    teacherId: mockTeachers[0],
    lessons: createLessons("67d664c2b90b8dbec6d342f2", 5),
    createdAt: "2025-03-20T17:05:22.901Z",
    updatedAt: "2025-03-20T17:05:22.901Z",
  },
]

// Function to get all courses with optional filtering
export async function getCourses({
  query = "",
  category = "",
}: {
  query?: string
  category?: string
}): Promise<Course[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredCourses = [...mockCourses]

  // Filter by search query
  if (query) {
    const searchQuery = query.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery) || course.description.toLowerCase().includes(searchQuery),
    )
  }

  // Filter by category
  if (category) {
    filteredCourses = filteredCourses.filter((course) => course.category.toLowerCase() === category.toLowerCase())
  }

  return filteredCourses
}

// Function to get a course by ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const course = mockCourses.find((course) => course._id === courseId)

  return course || null
}
