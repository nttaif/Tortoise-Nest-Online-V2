// Mock data for the dashboard

// Define basic data structures first without cross-references
const categories = ["Programming", "Design", "Business", "Marketing", "Data Science"]
const educationLevels = ["Bachelor", "Master", "PhD", "Associate Professor", "Professor"]
const majors = [
  { name: "Computer Science", color: "#4ade80" },
  { name: "Data Science", color: "#60a5fa" },
  { name: "Web Development", color: "#f472b6" },
  { name: "UI/UX Design", color: "#facc15" },
  { name: "Digital Marketing", color: "#fb923c" },
  { name: "Business Analytics", color: "#a78bfa" },
]

// Mock Courses (without teacher references initially)
export const mockCourses = Array.from({ length: 20 }, (_, i) => {
  const createdDate = new Date()
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365))

  return {
    _id: `course${i + 1}`,
    name: `Course ${i + 1}: ${["Advanced", "Intro to", "Mastering", "Complete"][i % 4]} ${categories[i % 5]}`,
    description: `This is a description for course ${i + 1}`,
    image: `/placeholder.svg?height=200&width=300`,
    price: Math.floor(Math.random() * 500) + 50,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined,
    lessons: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, j) => ({
      _id: `lesson${j + 1}`,
      title: `Lesson ${j + 1}`,
      duration: Math.floor(Math.random() * 60) + 10,
    })),
    category: categories[i % 5],
    status: Math.random() > 0.2,
    teacherId: { _id: `teacher${(i % 15) + 1}` },
    createdAt: createdDate.toISOString(),
    updatedAt: new Date().toISOString(),
  }
})

// Mock Teachers
export const mockTeachers = Array.from({ length: 15 }, (_, i) => {
  // Assign 1-3 random majors to each teacher
  const teacherMajors = []
  const majorCount = Math.floor(Math.random() * 3) + 1
  const shuffledMajors = [...majors].sort(() => 0.5 - Math.random())

  for (let j = 0; j < majorCount; j++) {
    teacherMajors.push(shuffledMajors[j])
  }

  const createdDate = new Date()
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 730)) // Up to 2 years ago

  // Find courses for this teacher
  const teacherCourses = mockCourses.filter(
    (course) => typeof course.teacherId === "object" && course.teacherId._id === `teacher${i + 1}`,
  )

  return {
    _id: `teacher${i + 1}`,
    firstName: ["John", "Sarah", "Michael", "Emma", "David", "Lisa", "Robert", "Jennifer", "William", "Maria"][i % 10],
    lastName: ["Smith", "Johnson", "Brown", "Davis", "Wilson", "Miller", "Moore", "Taylor", "Anderson", "Thomas"][
      i % 10
    ],
    address: `${Math.floor(Math.random() * 1000) + 100} Main St, City ${i + 1}`,
    avartar: `/placeholder.svg?height=150&width=150`,
    email: `teacher${i + 1}@example.com`,
    role: ["Instructor", "Senior Instructor", "Lead Instructor", "Department Head"][Math.floor(Math.random() * 4)],
    major: teacherMajors,
    educationLevel: educationLevels[Math.floor(Math.random() * educationLevels.length)],
    experienceYears: Math.floor(Math.random() * 20) + 1,
    publications: Array.from(
      { length: Math.floor(Math.random() * 5) },
      (_, j) =>
        `Publication ${j + 1}: ${["Advanced", "Modern", "Practical", "Theoretical"][j % 4]} ${teacherMajors[0]?.name || "Study"}`,
    ),
    courses: teacherCourses,
    isActive: Math.random() > 0.2,
    isClose: Math.random() > 0.8,
    createdAt: createdDate.toISOString(),
    updatedAt: new Date().toISOString(),
  }
})

// Mock Enrollments
export const mockEnrollments = Array.from({ length: 50 }, (_, i) => {
  const statuses = ["pending", "active", "cancelled"]
  const statusWeights = [0.2, 0.7, 0.1] // 20% pending, 70% active, 10% cancelled

  const randomStatus = () => {
    const rand = Math.random()
    let sum = 0
    for (let i = 0; i < statuses.length; i++) {
      sum += statusWeights[i]
      if (rand < sum) return statuses[i]
    }
    return statuses[0]
  }

  const status = randomStatus()
  const createdDate = new Date()
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 180))

  const userId = `user${Math.floor(Math.random() * 20) + 1}`
  const courseId = mockCourses[Math.floor(Math.random() * mockCourses.length)]._id

  return {
    _id: `enrollment${i + 1}`,
    userId: Math.random() > 0.5 ? userId : { _id: userId, name: `User ${userId.substring(4)}` },
    courseId: Math.random() > 0.5 ? courseId : mockCourses.find((c) => c._id === courseId),
    enrollmentStatus: status,
    transactionId: status !== "cancelled" ? `transaction${i + 1}` : undefined,
    createdAt: createdDate.toISOString(),
    updatedAt: new Date().toISOString(),
  }
})

// Mock Transactions
export const mockTransactions = Array.from({ length: 100 }, (_, i) => {
  const statuses = ["Pending", "Success", "Failed", "Cancel"]
  const statusWeights = [0.1, 0.75, 0.1, 0.05] // 10% pending, 75% success, 10% failed, 5% cancel

  const randomStatus = () => {
    const rand = Math.random()
    let sum = 0
    for (let i = 0; i < statuses.length; i++) {
      sum += statusWeights[i]
      if (rand < sum) return statuses[i]
    }
    return statuses[0]
  }

  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Crypto"]
  const createdDate = new Date()
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365))

  const userId = `user${Math.floor(Math.random() * 20) + 1}`
  const courseId = mockCourses[Math.floor(Math.random() * mockCourses.length)]._id
  const course = mockCourses.find((c) => c._id === courseId)

  return {
    _id: `transaction${i + 1}`,
    userId: Math.random() > 0.5 ? userId : { _id: userId, name: `User ${userId.substring(4)}` },
    courseId: Math.random() > 0.5 ? courseId : course,
    amount: course ? course.price - (course.discount || 0) : Math.floor(Math.random() * 500) + 50,
    status: randomStatus(),
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    transactionRef: `REF${Math.floor(Math.random() * 1000000)}`,
    createdAt: createdDate.toISOString(),
    updatedAt: new Date().toISOString(),
  }
})

// Mock Revenue Data
export const mockRevenueData = {
  daily: Array.from({ length: 30 }, (_, i) => ({
    name: (i + 1).toString(),
    total: Math.floor(Math.random() * 1000) + 100,
  })),

  monthly: Array.from({ length: 12 }, (_, i) => ({
    name: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
    total: Math.floor(Math.random() * 10000) + 1000,
  })),

  yearly: Array.from({ length: 5 }, (_, i) => ({
    name: (2019 + i).toString(),
    total: Math.floor(Math.random() * 100000) + 10000,
  })),
}

