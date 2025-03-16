"use client"

import type { Course } from "@/types/Courses"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Format price with Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Calculate discounted price
  const discountedPrice = course.discount ? course.price - (course.price * course.discount) / 100 : course.price

  return (
    <motion.div variants={item}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
            }}
          />
          {course.discount && course.discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md font-bold text-sm">
              -{course.discount}%
            </div>
          )}
          <Badge className="absolute bottom-3 left-3" variant="secondary">
            {course.category}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg line-clamp-2 h-14">{course.name}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 h-16">{course.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              {course.price > 0 ? (
                <div className="flex flex-col">
                  {course.discount && course.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through text-sm">{formatPrice(course.price)}</span>
                      <span className="font-bold text-red-500">{formatPrice(discountedPrice)}</span>
                    </>
                  ) : (
                    <span className="font-bold">{formatPrice(course.price)}</span>
                  )}
                </div>
              ) : (
                <span className="font-bold text-green-500">Free</span>
              )}
            </div>

            <Badge variant={course.status ? "success" : "destructive"}>{course.status ? "Active" : "Inactive"}</Badge>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button className="w-full gap-2">
            <BookOpen size={16} />
            View Course
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

