"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { getTransactions } from "@/components/common/action"
import { ITransaction } from "@/types/ITransaction "

export function Overview() {
  const [revenueData, setRevenueData] = useState<{
    daily: any[]
    monthly: any[]
    yearly: any[]
  }>({
    daily: [],
    monthly: [],
    yearly: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const data = await getTransactions()

        if (data) {
          const transactions = data as ITransaction[]

          // Tạo dữ liệu doanh thu
          const revenueData = generateRevenueData(transactions)
          setRevenueData(revenueData)
        } else {
          setError("Không thể tải dữ liệu giao dịch")
        }
      } catch (err) {
        console.error("Error fetching transactions:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu giao dịch")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Hàm tạo dữ liệu doanh thu từ giao dịch
  const generateRevenueData = (transactions: ITransaction[]) => {
    // Chỉ tính các giao dịch thành công
    const successTransactions = transactions.filter((t) => t.status === "Success")

    // Tạo dữ liệu doanh thu theo ngày
    const dailyMap = new Map<string, number>()
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    // Khởi tạo dữ liệu cho 30 ngày gần nhất
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentYear, currentMonth, today.getDate() - i)
      const dayKey = date.getDate().toString()
      dailyMap.set(dayKey, 0)
    }

    // Tính tổng doanh thu theo ngày
    successTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.createdAt)
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        const dayKey = transactionDate.getDate().toString()
        if (dailyMap.has(dayKey)) {
          dailyMap.set(dayKey, (dailyMap.get(dayKey) || 0) + transaction.amount)
        }
      }
    })

    const daily = Array.from(dailyMap.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => Number.parseInt(a.name) - Number.parseInt(b.name))

    // Tạo dữ liệu doanh thu theo tháng
    const monthlyMap = new Map<string, number>()

    // Khởi tạo dữ liệu cho 12 tháng gần nhất
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, currentMonth - i, 1)
      const monthKey = date.toLocaleString("default", { month: "short" })
      monthlyMap.set(monthKey, 0)
    }

    // Tính tổng doanh thu theo tháng
    successTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.createdAt)
      const monthDiff = (currentYear - transactionDate.getFullYear()) * 12 + currentMonth - transactionDate.getMonth()

      if (monthDiff >= 0 && monthDiff < 12) {
        const monthKey = transactionDate.toLocaleString("default", { month: "short" })
        if (monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + transaction.amount)
        }
      }
    })

    const monthly = Array.from(monthlyMap.entries())
      .map(([name, total]) => ({ name, total }))
      .reverse()

    // Tạo dữ liệu doanh thu theo năm
    const yearlyMap = new Map<string, number>()

    // Khởi tạo dữ liệu cho 5 năm gần nhất
    for (let i = 0; i < 5; i++) {
      const year = (currentYear - i).toString()
      yearlyMap.set(year, 0)
    }

    // Tính tổng doanh thu theo năm
    successTransactions.forEach((transaction) => {
      const transactionYear = new Date(transaction.createdAt).getFullYear().toString()
      if (yearlyMap.has(transactionYear)) {
        yearlyMap.set(transactionYear, (yearlyMap.get(transactionYear) || 0) + transaction.amount)
      }
    })

    const yearly = Array.from(yearlyMap.entries())
      .map(([name, total]) => ({ name, total }))
      .reverse()

    return { daily, monthly, yearly }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu doanh thu...</span>
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
    <Tabs defaultValue="daily" className="space-y-4">
      <TabsList>
        <TabsTrigger value="daily">Hàng ngày</TabsTrigger>
        <TabsTrigger value="monthly">Hàng tháng</TabsTrigger>
        <TabsTrigger value="yearly">Hàng năm</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hàng ngày</CardTitle>
            <CardDescription>Phân tích doanh thu theo ngày trong tháng hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {revenueData.daily.length === 0 ? (
              <div className="flex justify-center items-center h-[350px]">
                <p className="text-muted-foreground">Không có dữ liệu doanh thu</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData.daily}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Doanh thu"]}
                    labelFormatter={(label) => `Ngày ${label}`}
                  />
                  <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hàng tháng</CardTitle>
            <CardDescription>Phân tích doanh thu theo tháng trong năm hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {revenueData.monthly.length === 0 ? (
              <div className="flex justify-center items-center h-[350px]">
                <p className="text-muted-foreground">Không có dữ liệu doanh thu</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData.monthly}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip formatter={(value) => [`$${value}`, "Doanh thu"]} />
                  <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="yearly" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hàng năm</CardTitle>
            <CardDescription>Phân tích doanh thu theo năm</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {revenueData.yearly.length === 0 ? (
              <div className="flex justify-center items-center h-[350px]">
                <p className="text-muted-foreground">Không có dữ liệu doanh thu</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData.yearly}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip formatter={(value) => [`$${value}`, "Doanh thu"]} />
                  <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

