"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ITransaction } from "@/types/ITransaction "
import { Course } from "@/types/Courses"
import { getAllCourses, getTransactions } from "@/components/common/action"

const COLORS = ["#4ade80", "#f87171", "#facc15", "#60a5fa"]

export function TransactionSummary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [transactionsData, coursesData] = await Promise.all([getTransactions(), getAllCourses()])

        if (transactionsData && coursesData) {
          setTransactions(transactionsData as ITransaction[])
          setCourses(coursesData as Course[])
        } else {
          setError("Không thể tải dữ liệu giao dịch")
        }
      } catch (err) {
        console.error("Error fetching transaction data:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu giao dịch")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (typeof transaction.userId === "string" && transaction.userId.includes(searchTerm)) ||
      (typeof transaction.courseId === "string" && transaction.courseId.includes(searchTerm)) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.paymentMethod && transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Generate transaction status data
  const statusData = [
    { name: "Thành công", value: transactions.filter((t) => t.status === "Success").length },
    { name: "Thất bại", value: transactions.filter((t) => t.status === "Failed").length },
    { name: "Đang chờ", value: transactions.filter((t) => t.status === "Pending").length },
    { name: "Đã hủy", value: transactions.filter((t) => t.status === "Cancel").length },
  ]

  // Tạo dữ liệu giao dịch hàng tháng từ dữ liệu thực tế
  const generateMonthlyTransactionData = () => {
    // Tạo một đối tượng để lưu trữ số tiền giao dịch theo tháng
    const monthlyData: Record<string, { success: number; failed: number }> = {}

    // Khởi tạo dữ liệu cho 12 tháng gần nhất
    const today = new Date()
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = date.toLocaleString("default", { month: "short" })
      monthlyData[monthKey] = { success: 0, failed: 0 }
    }

    // Tính tổng số tiền giao dịch theo tháng và trạng thái
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.createdAt)
      // Chỉ xem xét giao dịch trong 12 tháng gần nhất
      const monthDiff =
        (today.getFullYear() - transactionDate.getFullYear()) * 12 + today.getMonth() - transactionDate.getMonth()

      if (monthDiff >= 0 && monthDiff < 12) {
        const monthKey = transactionDate.toLocaleString("default", { month: "short" })

        if (monthlyData[monthKey]) {
          if (transaction.status === "Success") {
            monthlyData[monthKey].success += transaction.amount
          } else if (transaction.status === "Failed") {
            monthlyData[monthKey].failed += transaction.amount
          }
        }
      }
    })

    // Chuyển đổi dữ liệu thành mảng để sử dụng trong biểu đồ
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        name: month,
        success: Math.round(data.success),
        failed: Math.round(data.failed),
      }))
      .reverse() // Đảo ngược để hiển thị từ tháng cũ đến tháng mới
  }

  const monthlyData =
    transactions.length > 0
      ? generateMonthlyTransactionData()
      : Array.from({ length: 12 }, (_, i) => {
          const month = new Date(2023, i, 1).toLocaleString("default", { month: "short" })
          return {
            name: month,
            success: 0,
            failed: 0,
          }
        })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu giao dịch...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <h3 className="text-lg font-medium">Lỗi</h3>
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Danh sách giao dịch</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" onClick={() => setSearchTerm("")}>
            Xóa
          </Button>
        </div>
      </div>

      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách giao dịch</CardTitle>
            <CardDescription>Danh sách tất cả giao dịch với thông tin chi tiết</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Khóa học</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Phương thức thanh toán</TableHead>
                  <TableHead>Ngày</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Không tìm thấy giao dịch nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.slice(0, 10).map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        {typeof transaction.userId === "string"
                          ? transaction.userId.substring(0, 8)
                          : transaction.userId.lastName || "Người dùng"}
                      </TableCell>
                      <TableCell>
                        {typeof transaction.courseId === "string"
                          ? courses.find((c) => c._id === transaction.courseId)?.name ||
                            transaction.courseId.substring(0, 8)
                          : transaction.courseId.name}
                      </TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Success"
                              ? "default"
                              : transaction.status === "Pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {transaction.status === "Success"
                            ? "Thành công"
                            : transaction.status === "Pending"
                              ? "Đang chờ"
                              : transaction.status === "Failed"
                                ? "Thất bại"
                                : "Đã hủy"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.paymentMethod || "N/A"}</TableCell>
                      <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái giao dịch</CardTitle>
              <CardDescription>Phân bố giao dịch theo trạng thái</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {statusData.every((item) => item.value === 0) ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Khối lượng giao dịch hàng tháng</CardTitle>
              <CardDescription>Khối lượng giao dịch theo tháng</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Số tiền"]} />
                  <Legend />
                  <Bar dataKey="success" name="Thành công" fill="#4ade80" />
                  <Bar dataKey="failed" name="Thất bại" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

