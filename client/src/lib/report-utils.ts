import { getAllCourses, getEnrollments, getListTeacher } from "@/components/common/action";
import { Course } from "@/types/Courses";
import { IEnrollment } from "@/types/IEnrollment";
import { getTransactions } from "./data";
import { ITransaction } from "@/types/ITransaction ";

// Helper function to check if a date is within a range
const isDateInRange = (dateStr: string, range: { from: Date; to: Date }) => {
  const date = new Date(dateStr);
  return date >= range.from && date <= range.to;
};

// Function to generate report data based on type and date range
export const generateReportData = async (
  reportType: string, 
  dateRange: { from: Date; to: Date }
) => {
  switch (reportType) {
    case "courses": {
      const coursesData = await getAllCourses();
      if (!coursesData) return [];
      
      return (coursesData as Course[])
        .filter(course => isDateInRange(course.createdAt, dateRange))
        .map(course => ({
          id: course._id,
          name: course.name,
          category: course.category,
          price: course.price,
          discount: course.discount || 0,
          status: course.status ? "Active" : "Inactive",
          teacherId: typeof course.teacherId === 'object' ? course.teacherId._id : course.teacherId,
          createdAt: new Date(course.createdAt).toLocaleDateString(),
          updatedAt: new Date(course.updatedAt).toLocaleDateString(),
        }));
    }
      
    case "teachers": {
      const teachersData = await getListTeacher();
      if (!teachersData || !teachersData.results) return [];
      
      return teachersData.results
        .filter(teacher => isDateInRange(teacher.createdAt, dateRange))
        .map(teacher => ({
          id: teacher._id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          email: teacher.email,
          role: teacher.role,
          majors: teacher.major.map(m => m.name).join(", "),
          education: teacher.educationLevel || "N/A",
          experience: teacher.experienceYears || 0,
          courseCount: teacher.courses?.length || 0,
          status: teacher.isActive ? "Active" : "Inactive",
          createdAt: new Date(teacher.createdAt).toLocaleDateString(),
        }));
    }
      
    case "enrollments": {
      const enrollmentsData = await getEnrollments();
      const coursesData = await getAllCourses();
      
      if (!enrollmentsData || !coursesData) return [];
      
      const courses = coursesData as Course[];
      
      return (enrollmentsData as IEnrollment[])
        .filter(enrollment => isDateInRange(enrollment.createdAt, dateRange))
        .map(enrollment => {
          const courseId = typeof enrollment.courseId === 'object' ? enrollment.courseId._id : enrollment.courseId;
          const course = courses.find(c => c._id === courseId);
          
          return {
            id: enrollment._id,
            userId: typeof enrollment.userId === 'object' ? enrollment.userId._id : enrollment.userId,
            courseId: courseId,
            courseName: typeof enrollment.courseId === 'object' ? enrollment.courseId.name : 
              course?.name || "Unknown",
            status: enrollment.enrollmentStatus,
            transactionId: enrollment.transactionId || "N/A",
            createdAt: new Date(enrollment.createdAt).toLocaleDateString(),
          };
        });
    }
      
    case "transactions": {
      const transactionsData = await getTransactions();
      const coursesData = await getAllCourses();
      
      if (!transactionsData || !coursesData) return [];
      
      const courses = coursesData as Course[];
      
      return (transactionsData as ITransaction[])
        .filter(transaction => isDateInRange(transaction.createdAt, dateRange))
        .map(transaction => {
          const courseId = typeof transaction.courseId === 'object' ? transaction.courseId._id : transaction.courseId;
          const course = courses.find(c => c._id === courseId);
          
          return {
            id: transaction._id,
            userId: typeof transaction.userId === 'object' ? transaction.userId._id : transaction.userId,
            courseId: courseId,
            courseName: typeof transaction.courseId === 'object' ? transaction.courseId.name : 
              course?.name || "Unknown",
            amount: transaction.amount,
            status: transaction.status,
            paymentMethod: transaction.paymentMethod || "N/A",
            reference: transaction.transactionRef || "N/A",
            createdAt: new Date(transaction.createdAt).toLocaleDateString(),
          };
        });
    }
      
    case "summary": {
      // Fetch all data
      const [coursesData, teachersData, enrollmentsData, transactionsData] = await Promise.all([
        getAllCourses(),
        getListTeacher(),
        getEnrollments(),
        getTransactions()
      ]);
      
      if (!coursesData || !teachersData || !enrollmentsData || !transactionsData) {
        return [];
      }
      
      // Filter data by date range
      const courses = (coursesData as Course[]).filter(course => isDateInRange(course.createdAt, dateRange));
      const teachers = teachersData.results.filter(teacher => isDateInRange(teacher.createdAt, dateRange));
      const enrollments = (enrollmentsData as IEnrollment[]).filter(enrollment => isDateInRange(enrollment.createdAt, dateRange));
      const transactions = (transactionsData as ITransaction[]).filter(transaction => isDateInRange(transaction.createdAt, dateRange));
      
      // Calculate revenue
      const totalRevenue = transactions
        .filter(t => t.status === 'Success')
        .reduce((sum, t) => sum + t.amount, 0);
      
      // Calculate active courses and teachers
      const activeCourses = courses.filter(c => c.status).length;
      const activeTeachers = teachers.filter(t => t.isActive).length;
      
      // Calculate enrollment statistics
      const activeEnrollments = enrollments.filter(e => e.enrollmentStatus === 'active').length;
      const pendingEnrollments = enrollments.filter(e => e.enrollmentStatus === 'pending').length;
      const cancelledEnrollments = enrollments.filter(e => e.enrollmentStatus === 'cancelled').length;
      
      // Calculate transaction statistics
      const successfulTransactions = transactions.filter(t => t.status === 'Success').length;
      const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
      const failedTransactions = transactions.filter(t => t.status === 'Failed').length;
      const cancelledTransactions = transactions.filter(t => t.status === 'Cancel').length;
      
      // Return summary data
      return [
        { category: "Tổng doanh thu", value: `$${totalRevenue.toFixed(2)}` },
        { category: "Số khóa học", value: courses.length, active: activeCourses, inactive: courses.length - activeCourses },
        { category: "Số giảng viên", value: teachers.length, active: activeTeachers, inactive: teachers.length - activeTeachers },
        { category: "Số đăng ký", value: enrollments.length, active: activeEnrollments, pending: pendingEnrollments, cancelled: cancelledEnrollments },
        { category: "Số giao dịch", value: transactions.length, successful: successfulTransactions, pending: pendingTransactions, failed: failedTransactions, cancelled: cancelledTransactions },
        { category: "Thời gian báo cáo", value: `${new Date(dateRange.from).toLocaleDateString()} - ${new Date(dateRange.to).toLocaleDateString()}` },
      ];
    }
      
    default:
      return [];
  }
};
