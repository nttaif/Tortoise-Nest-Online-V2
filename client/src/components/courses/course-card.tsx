"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Course } from "@/types/Courses"
import { TeacherInfo } from "./teacher-info"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate discounted price if discount exists
  const finalPrice = course.discount ? course.price - (course.price * course.discount) / 100 : course.price

  return (
    <Card
      className="overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg?height=200&width=300"}
          alt={course.name}
          fill
          className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {!course.status && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Không khả dụng
            </Badge>
          </div>
        )}
        {course.discount && course.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500">-{course.discount}%</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{course.name}</h3>
          <Badge variant="outline" className="ml-2 shrink-0">
            {course.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{course.description}</p>
        <TeacherInfo teacher={course.teacherId} />
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex flex-col">
          {course.discount ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{finalPrice.toLocaleString("vi-VN")}đ</span>
              <span className="text-sm text-muted-foreground line-through">
                {course.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold">{course.price.toLocaleString("vi-VN")}đ</span>
          )}
        </div>
        <Button disabled={!course.status} asChild={course.status}>
          {course.status ? <Link href={`/courses/${course._id}`}>Đăng ký</Link> : "Hết chỗ"}
        </Button>
      </CardFooter>
    </Card>
  )
}

