import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "@/types/Courses"
import type { Teacher } from "@/types/Teacher"
import Image from "next/image"

interface CourseSummaryProps {
  course: Course
  teacher: Teacher
}

export default function CourseSummary({ course, teacher }: CourseSummaryProps) {
  // Calculate discounted price if applicable
  const finalPrice = course.discount ? course.price - (course.price * course.discount) / 100 : course.price

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={course.image || "/placeholder.svg?height=96&width=96"}
              alt={course.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">{course.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{course.category}</p>
            <p className="text-sm text-gray-500">
              Instructor: {teacher.firstName} {teacher.lastName}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Original Price</span>
            <span>${course.price.toFixed(2)}</span>
          </div>

          {course.discount && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount ({course.discount}%)</span>
              <span>-${((course.price * course.discount) / 100).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
            <span>Total</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-sm text-gray-500 pt-4 border-t">
          <p className="mb-2">
            By completing your purchase you agree to our{" "}
            <a href="#" className="text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
          <p>Your payment information is processed securely.</p>
        </div>
      </CardContent>
    </Card>
  )
}

