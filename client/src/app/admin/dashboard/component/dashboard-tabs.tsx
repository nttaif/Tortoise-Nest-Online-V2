"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "./overview"
import { RecentSales } from "./recent-sales"
import { CoursePerformance } from "./course-performance"
import { EnrollmentStats } from "./enrollment-stats"
import { TransactionSummary } from "./transaction-summary"
import { TeacherAnalytics } from "./teacher-analytics"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"
import { getAllCourses, getEnrollments, getListTeacher, getTransactions } from "@/components/common/action"

export default function DashboardTabs() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeEnrollments: 0,
    activeCourses: 0,
    activeTeachers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        const [coursesData, teachersData, enrollmentsData, transactionsData] = await Promise.all([
          getAllCourses(),
          getListTeacher(),
          getEnrollments(),
          getTransactions(),
        ])

        // Tính tổng doanh thu từ các giao dịch thành công
        const totalRevenue = transactionsData
          ? (transactionsData as any[]).filter((t) => t.status === "Success").reduce((sum, t) => sum + t.amount, 0)
          : 0

        // Tính số lượng đăng ký hoạt động
        const activeEnrollments = enrollmentsData
          ? (enrollmentsData as any[]).filter((e) => e.enrollmentStatus === "active").length
          : 0

        // Tính số lượng khóa học hoạt động
        const activeCourses = coursesData ? (coursesData as any[]).filter((c) => c.status).length : 0

        // Tính số lượng giảng viên hoạt động
        const activeTeachers =
          teachersData && teachersData.results ? teachersData.results.filter((t) => t.isActive).length : 0

        setStats({
          totalRevenue,
          activeEnrollments,
          activeCourses,
          activeTeachers,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  // Tính phần trăm tăng trưởng (giả lập)
  const getRandomGrowth = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(1)
  }

  return (
    <Tabs defaultValue={activeTab} className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="courses">Khóa học</TabsTrigger>
          <TabsTrigger value="teachers">Giảng viên</TabsTrigger>
          <TabsTrigger value="enrollments">Đăng ký</TabsTrigger>
          <TabsTrigger value="transactions">Giao dịch</TabsTrigger>
        </TabsList>

        <Button asChild variant="outline" className="flex items-center">
          <Link href="/reports">
            <FileText className="mr-2 h-4 w-4" />
            Báo cáo
          </Link>
        </Button>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+{getRandomGrowth(15, 25)}% từ tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đăng ký hoạt động</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEnrollments}</div>
              <p className="text-xs text-muted-foreground">+{getRandomGrowth(10, 20)}% từ tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khóa học hoạt động</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCourses}</div>
              <p className="text-xs text-muted-foreground">+{getRandomGrowth(5, 15)}% từ tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Giảng viên hoạt động</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTeachers}</div>
              <p className="text-xs text-muted-foreground">+{getRandomGrowth(2, 8)}% từ tháng trước</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Tổng quan doanh thu</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
              <CardDescription>Các giao dịch mới nhất trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="space-y-4">
        <CoursePerformance />
      </TabsContent>

      <TabsContent value="teachers" className="space-y-4">
        <TeacherAnalytics />
      </TabsContent>

      <TabsContent value="enrollments" className="space-y-4">
        <EnrollmentStats />
      </TabsContent>

      <TabsContent value="transactions" className="space-y-4">
        <TransactionSummary />
      </TabsContent>
    </Tabs>
  )
}

