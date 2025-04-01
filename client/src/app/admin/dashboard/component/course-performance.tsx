"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Loader2 } from "lucide-react"
import { getAllCourses } from "@/components/common/action"
import { Course } from "@/types/Courses"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function CoursePerformance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await getAllCourses()
        if (data) {
          setCourses(data as Course[])
        } else {
          setError("Không thể tải dữ liệu khóa học")
        }
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu khóa học")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate category distribution
  const categoryData = courses.reduce((acc: any[], course) => {
    const existingCategory = acc.find((item) => item.name === course.category)
    if (existingCategory) {
      existingCategory.value += 1
    } else {
      acc.push({ name: course.category, value: 1 })
    }
    return acc
  }, [])

  // Calculate price distribution
  const priceRanges = [
    { range: "0-50", min: 0, max: 50 },
    { range: "51-100", min: 51, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-500", min: 201, max: 500 },
    { range: "500+", min: 501, max: Number.POSITIVE_INFINITY },
  ]

  const priceData = priceRanges.map((range) => {
    const count = courses.filter((course) => course.price >= range.min && course.price <= range.max).length
    return { name: range.range, value: count }
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu khóa học...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <h3 className="text-lg font-medium">Lỗi</h3>
        <p>{error}</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Thử lại
        </Button>
      </div>
    )
  }

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Danh sách khóa học</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm khóa học..."
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
            <CardTitle>Danh sách khóa học</CardTitle>
            <CardDescription>Danh sách tất cả khóa học với thông tin chi tiết</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Không tìm thấy khóa học nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>${course.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={course.status ? "default" : "secondary"}>
                          {course.status ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {typeof course.teacherId === "string" ? course.teacherId : course.teacherId?.lastName || "N/A"}
                      </TableCell>
                      <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
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
              <CardTitle>Danh mục khóa học</CardTitle>
              <CardDescription>Phân bố khóa học theo danh mục</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {categoryData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
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
              <CardTitle>Phân bố giá</CardTitle>
              <CardDescription>Phân bố khóa học theo khoảng giá</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {priceData.every((item) => item.value === 0) ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {priceData.map((entry, index) => (
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
        </div>
      </TabsContent>
    </Tabs>
  )
}

