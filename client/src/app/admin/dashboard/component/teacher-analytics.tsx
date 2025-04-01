"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from 'lucide-react'
import { getListTeacher } from "@/components/common/action"
import { Teacher } from "@/types/Teacher"

const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#fb923c", "#a78bfa"]

export function TeacherAnalytics() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const data = await getListTeacher()
        if (data && data.results) {
          setTeachers(data.results)
        } else {
          setError("Không thể tải dữ liệu giảng viên")
        }
      } catch (err) {
        console.error("Error fetching teachers:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu giảng viên")
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.major.some((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Calculate education level distribution
  const educationData = teachers.reduce((acc: any[], teacher) => {
    if (!teacher.educationLevel) return acc

    const existingLevel = acc.find((item) => item.name === teacher.educationLevel)
    if (existingLevel) {
      existingLevel.value += 1
    } else {
      acc.push({ name: teacher.educationLevel, value: 1 })
    }
    return acc
  }, [])

  // Calculate major distribution
  const majorData = teachers.reduce((acc: any[], teacher) => {
    teacher.major.forEach((major) => {
      const existingMajor = acc.find((item) => item.name === major.name)
      if (existingMajor) {
        existingMajor.value += 1
      } else {
        acc.push({ name: major.name, value: 1, color: major.color })
      }
    })
    return acc
  }, [])

  // Calculate experience distribution
  const experienceRanges = [
    { range: "0-2 năm", min: 0, max: 2 },
    { range: "3-5 năm", min: 3, max: 5 },
    { range: "6-10 năm", min: 6, max: 10 },
    { range: "11-15 năm", min: 11, max: 15 },
    { range: "16+ năm", min: 16, max: Number.POSITIVE_INFINITY },
  ]

  const experienceData = experienceRanges.map((range) => {
    const count = teachers.filter(
      (teacher) => teacher.experienceYears >= range.min && teacher.experienceYears <= range.max,
    ).length
    return { name: range.range, value: count }
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu giảng viên...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <h3 className="text-lg font-medium">Lỗi</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-2" 
          onClick={() => window.location.reload()}
        >
          Thử lại
        </Button>
      </div>
    )
  }

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Danh sách giảng viên</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Tìm kiếm giảng viên..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button type="submit" onClick={() => setSearchTerm("")}>
            Xóa
          </Button>
        </div>
      </div>

      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách giảng viên</CardTitle>
            <CardDescription>Danh sách tất cả giảng viên với thông tin chi tiết</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Chuyên ngành</TableHead>
                  <TableHead>Học vấn</TableHead>
                  <TableHead>Kinh nghiệm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Không tìm thấy giảng viên nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={teacher.avartar} alt={`${teacher.firstName} ${teacher.lastName}`} />
                            <AvatarFallback>
                              {teacher.firstName[0]}
                              {teacher.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {teacher.firstName} {teacher.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">{teacher.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.role}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.major.map((major, index) => (
                            <Badge key={index} style={{ backgroundColor: major.color }}>
                              {major.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.educationLevel || "N/A"}</TableCell>
                      <TableCell>{teacher.experienceYears} năm</TableCell>
                      <TableCell>
                        <Badge variant={teacher.isActive ? "default" : "secondary"}>
                          {teacher.isActive ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTeacher(teacher)}>
                              Xem
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>Hồ sơ giảng viên</DialogTitle>
                              <DialogDescription>
                                Thông tin chi tiết về {teacher.firstName} {teacher.lastName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={teacher.avartar} alt={`${teacher.firstName} ${teacher.lastName}`} />
                                  <AvatarFallback className="text-lg">
                                    {teacher.firstName[0]}
                                    {teacher.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-bold">
                                    {teacher.firstName} {teacher.lastName}
                                  </h3>
                                  <p className="text-muted-foreground">{teacher.role}</p>
                                  <p className="text-sm">{teacher.email}</p>
                                  <div className="flex gap-2 mt-2">
                                    {teacher.major.map((major, index) => (
                                      <Badge key={index} style={{ backgroundColor: major.color }}>
                                        {major.name}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Thông tin cá nhân</h4>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <span className="font-medium">Địa chỉ:</span> {teacher.address || "N/A"}
                                    </p>
                                    <p>
                                      <span className="font-medium">Học vấn:</span> {teacher.educationLevel || "N/A"}
                                    </p>
                                    <p>
                                      <span className="font-medium">Kinh nghiệm:</span> {teacher.experienceYears} năm
                                    </p>
                                    <p>
                                      <span className="font-medium">Trạng thái:</span>{" "}
                                      {teacher.isActive ? "Hoạt động" : "Không hoạt động"}
                                    </p>
                                    <p>
                                      <span className="font-medium">Ngày tham gia:</span>{" "}
                                      {new Date(teacher.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Ấn phẩm</h4>
                                  {teacher.publications && teacher.publications.length > 0 ? (
                                    <ScrollArea className="h-[100px]">
                                      <ul className="list-disc pl-5 text-sm space-y-1">
                                        {teacher.publications.map((pub, index) => (
                                          <li key={index}>{pub}</li>
                                        ))}
                                      </ul>
                                    </ScrollArea>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">Không có ấn phẩm</p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Khóa học ({teacher.courses?.length || 0})</h4>
                                {teacher.courses && teacher.courses.length > 0 ? (
                                  <ScrollArea className="h-[150px]">
                                    <div className="space-y-2">
                                      {teacher.courses.map((course, index) => (
                                        <div key={index} className="border rounded-md p-2">
                                          <div className="font-medium">{course.name}</div>
                                          <div className="text-sm text-muted-foreground">{course.category}</div>
                                          <div className="text-sm">${course.price.toFixed(2)}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                ) : (
                                  <p className="text-sm text-muted-foreground">Không có khóa học được gán</p>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
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
              <CardTitle>Phân bố trình độ học vấn</CardTitle>
              <CardDescription>Phân bố giảng viên theo trình độ học vấn</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {educationData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={educationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {educationData.map((entry, index) => (
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
              <CardTitle>Phân bố chuyên ngành</CardTitle>
              <CardDescription>Phân bố giảng viên theo chuyên ngành</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {majorData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={majorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {majorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
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

        <Card>
          <CardHeader>
            <CardTitle>Phân bố kinh nghiệm</CardTitle>
            <CardDescription>Phân bố giảng viên theo số năm kinh nghiệm</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {experienceData.every(item => item.value === 0) ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">Không có dữ liệu</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={experienceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Giảng viên" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Giảng viên hoạt động vs. không hoạt động</CardTitle>
              <CardDescription>Phân bố trạng thái giảng viên hiện tại</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {teachers.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Hoạt động", value: teachers.filter((t) => t.isActive).length },
                        { name: "Không hoạt động", value: teachers.filter((t) => !t.isActive).length },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#f87171" />
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
              <CardTitle>Khóa học mỗi giảng viên</CardTitle>
              <CardDescription>Số lượng khóa học được gán cho mỗi giảng viên</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {teachers.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">Không có dữ liệu</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teachers.slice(0, 10).map((teacher) => ({
                      name: `${teacher.firstName} ${teacher.lastName.charAt(0)}.`,
                      courses: teacher.courses?.length || 0,
                    }))}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="courses" name="Số khóa học" fill="#a78bfa" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
