import { mockCourses, mockTeachers, mockEnrollments, mockTransactions } from "@/lib/mock-data"

// Helper function to check if a date is within a range
const isDateInRange = (dateStr: string, range: { from: Date; to: Date }) => {
  const date = new Date(dateStr)
  return date >= range.from && date <= range.to
}

// Function to generate report data based on type and date range
export const generateReportData = (reportType: string, dateRange: { from: Date; to: Date }) => {
  switch (reportType) {
    case "courses":
      return mockCourses
        .filter((course) => isDateInRange(course.createdAt, dateRange))
        .map((course) => ({
          id: course._id,
          name: course.name,
          category: course.category,
          price: course.price,
          discount: course.discount || 0,
          status: course.status ? "Active" : "Inactive",
          teacherId: typeof course.teacherId === "object" ? course.teacherId._id : course.teacherId,
          createdAt: new Date(course.createdAt).toLocaleDateString(),
          updatedAt: new Date(course.updatedAt).toLocaleDateString(),
        }))

    case "teachers":
      return mockTeachers
        .filter((teacher) => isDateInRange(teacher.createdAt, dateRange))
        .map((teacher) => ({
          id: teacher._id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          email: teacher.email,
          role: teacher.role,
          majors: teacher.major.map((m) => m.name).join(", "),
          education: teacher.educationLevel || "N/A",
          experience: teacher.experienceYears || 0,
          courseCount: teacher.courses?.length || 0,
          status: teacher.isActive ? "Active" : "Inactive",
          createdAt: new Date(teacher.createdAt).toLocaleDateString(),
        }))

    case "enrollments":
      return mockEnrollments
        .filter((enrollment) => isDateInRange(enrollment.createdAt, dateRange))
        .map((enrollment) => ({
          id: enrollment._id,
          userId: typeof enrollment.userId === "object" ? enrollment.userId._id : enrollment.userId,
          courseId: typeof enrollment.courseId === "object" ? enrollment.courseId._id : enrollment.courseId,
          courseName:
            typeof enrollment.courseId === "object"
              ? enrollment.courseId.name
              : mockCourses.find((c) => c._id === enrollment.courseId)?.name || "Unknown",
          status: enrollment.enrollmentStatus,
          transactionId: enrollment.transactionId || "N/A",
          createdAt: new Date(enrollment.createdAt).toLocaleDateString(),
        }))

    case "transactions":
      return mockTransactions
        .filter((transaction) => isDateInRange(transaction.createdAt, dateRange))
        .map((transaction) => ({
          id: transaction._id,
          userId: typeof transaction.userId === "object" ? transaction.userId._id : transaction.userId,
          courseId: typeof transaction.courseId === "object" ? transaction.courseId._id : transaction.courseId,
          courseName:
            typeof transaction.courseId === "object"
              ? transaction.courseId.name
              : mockCourses.find((c) => c._id === transaction.courseId)?.name || "Unknown",
          amount: transaction.amount,
          status: transaction.status,
          paymentMethod: transaction.paymentMethod || "N/A",
          reference: transaction.transactionRef || "N/A",
          createdAt: new Date(transaction.createdAt).toLocaleDateString(),
        }))

    case "summary":
      // Create a summary report with statistics
      const coursesInRange = mockCourses.filter((course) => isDateInRange(course.createdAt, dateRange))
      const teachersInRange = mockTeachers.filter((teacher) => isDateInRange(teacher.createdAt, dateRange))
      const enrollmentsInRange = mockEnrollments.filter((enrollment) => isDateInRange(enrollment.createdAt, dateRange))
      const transactionsInRange = mockTransactions.filter((transaction) =>
        isDateInRange(transaction.createdAt, dateRange),
      )

      // Calculate revenue
      const totalRevenue = transactionsInRange
        .filter((t) => t.status === "Success")
        .reduce((sum, t) => sum + t.amount, 0)

      // Calculate active courses and teachers
      const activeCourses = coursesInRange.filter((c) => c.status).length
      const activeTeachers = teachersInRange.filter((t) => t.isActive).length

      // Calculate enrollment statistics
      const activeEnrollments = enrollmentsInRange.filter((e) => e.enrollmentStatus === "active").length
      const pendingEnrollments = enrollmentsInRange.filter((e) => e.enrollmentStatus === "pending").length
      const cancelledEnrollments = enrollmentsInRange.filter((e) => e.enrollmentStatus === "cancelled").length

      // Calculate transaction statistics
      const successfulTransactions = transactionsInRange.filter((t) => t.status === "Success").length
      const pendingTransactions = transactionsInRange.filter((t) => t.status === "Pending").length
      const failedTransactions = transactionsInRange.filter((t) => t.status === "Failed").length
      const cancelledTransactions = transactionsInRange.filter((t) => t.status === "Cancel").length

      // Return summary data
      return [
        { category: "Tổng doanh thu", value: `$${totalRevenue.toFixed(2)}` },
        {
          category: "Số khóa học",
          value: coursesInRange.length,
          active: activeCourses,
          inactive: coursesInRange.length - activeCourses,
        },
        {
          category: "Số giảng viên",
          value: teachersInRange.length,
          active: activeTeachers,
          inactive: teachersInRange.length - activeTeachers,
        },
        {
          category: "Số đăng ký",
          value: enrollmentsInRange.length,
          active: activeEnrollments,
          pending: pendingEnrollments,
          cancelled: cancelledEnrollments,
        },
        {
          category: "Số giao dịch",
          value: transactionsInRange.length,
          successful: successfulTransactions,
          pending: pendingTransactions,
          failed: failedTransactions,
          cancelled: cancelledTransactions,
        },
        {
          category: "Thời gian báo cáo",
          value: `${new Date(dateRange.from).toLocaleDateString()} - ${new Date(dateRange.to).toLocaleDateString()}`,
        },
      ]

    default:
      return []
  }
}

