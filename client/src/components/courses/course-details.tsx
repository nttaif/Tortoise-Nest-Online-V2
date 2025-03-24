"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherProfile } from "./teacher-profile"
import type { Course } from "@/types/Courses"
import { Calendar, Clock, Users, BookOpen, CheckCircle } from "lucide-react"
import { PaymentForm } from "./enrollment-form"
import type { IEnrollment } from "@/types/IEnrollment"
import { getEnrollmentsByUserId } from "../common/action"

interface CourseDetailsProps {
  userID?: string
  course: Course
}

export default function CourseDetails({ course, userID }: CourseDetailsProps) {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Calculate discounted price if discount exists
  const finalPrice = course.discount ? course.price - (course.price * course.discount) / 100 : course.price

  // Check if user is already enrolled in this course
  useEffect(() => {
    async function checkEnrollment() {
      if (!userID) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const enrollments = await getEnrollmentsByUserId(userID)

        if (enrollments && Array.isArray(enrollments)) {
          // Check if this course exists in user's enrollments
          const enrolled = enrollments.some((enrollment: IEnrollment) => {
            // Handle both string ID and object with _id
            const courseId =
              typeof enrollment.courseId === "string" ? enrollment.courseId : (enrollment.courseId as any)._id

            return courseId === course._id && enrollment.enrollmentStatus !== "cancelled"
          })

          setIsEnrolled(enrolled)
        }
      } catch (error) {
        console.error("Error checking enrollment:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkEnrollment()
  }, [userID, course._id])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline">{course.category}</Badge>
            {course.discount && course.discount > 0 ? (
              <Badge className="bg-red-500">Giảm {course.discount}%</Badge>
            ) : null}
            {!course.status && <Badge variant="destructive">Không khả dụng</Badge>}
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.name}</h1>

          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={course.image || "/placeholder.svg?height=400&width=600"}
              alt={course.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="curriculum">Nội dung</TabsTrigger>
            <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center">8 tuần</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center">24 bài học</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Users className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center">120 học viên</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center">Truy cập trọn đời</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Mô tả khóa học</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {course.description}
                {/* Thêm mô tả chi tiết hơn */}
                {"\n\n"}
                Khóa học này được thiết kế để giúp bạn nắm vững các kỹ năng cần thiết trong lĩnh vực {course.category}.
                Bạn sẽ được học từ những giảng viên có nhiều kinh nghiệm trong ngành và được thực hành thông qua các bài
                tập thực tế.
                {"\n\n"}
                Sau khi hoàn thành khóa học, bạn sẽ có khả năng:
                {"\n"}• Hiểu và áp dụng các nguyên lý cơ bản
                {"\n"}• Xây dựng các dự án thực tế
                {"\n"}• Giải quyết các vấn đề phức tạp
                {"\n"}• Cập nhật các xu hướng mới nhất trong ngành
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Bạn sẽ học được gì</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>
                      Kỹ năng quan trọng #{i + 1} trong lĩnh vực {course.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold mb-3">Nội dung khóa học</h3>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, moduleIndex) => (
                <div key={moduleIndex} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <h4 className="font-medium">
                      Module {moduleIndex + 1}: Chủ đề chính #{moduleIndex + 1}
                    </h4>
                  </div>
                  <div className="divide-y">
                    {Array.from({ length: 3 }).map((_, lessonIndex) => (
                      <div key={lessonIndex} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Bài {moduleIndex * 3 + lessonIndex + 1}:</span>
                          <span className="text-sm">Tiêu đề bài học #{moduleIndex * 3 + lessonIndex + 1}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">45 phút</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instructor" className="pt-4">
            <TeacherProfile teacher={course.teacherId} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Giá gốc:</span>
                    <span className={course.discount ? "line-through text-muted-foreground" : "font-semibold"}>
                      {course.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>

                  {course.discount && course.discount > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Giảm giá:</span>
                        <span className="text-red-500">-{course.discount}%</span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-2">
                        <span className="font-medium">Giá cuối:</span>
                        <span className="text-xl font-bold">{finalPrice.toLocaleString("vi-VN")} VNĐ</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {isLoading ? (
                    <Button className="w-full" size="lg" disabled>
                      Đang tải...
                    </Button>
                  ) : isEnrolled ? (
                    <Button className="w-full" size="lg" variant="secondary" disabled>
                      Đã tham gia
                    </Button>
                  ) : showEnrollmentForm ? (
                    <PaymentForm userID={userID} course={course} onCancel={() => setShowEnrollmentForm(false)} />
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!course.status}
                      onClick={() => setShowEnrollmentForm(true)}
                    >
                      {course.status ? "Đăng ký ngay" : "Hết chỗ"}
                    </Button>
                  )}

                  <Button variant="outline" className="w-full" size="lg">
                    Thêm vào danh sách yêu thích
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Khóa học bao gồm:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>24 bài học</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>4 bài kiểm tra</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>10 bài tập thực hành</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Chứng chỉ hoàn thành</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Hỗ trợ trọn đời</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

