import { sampleCourses } from "@/data/sample.data.courses"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { getCoursesById } from "@/components/common/action"

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCoursesById(params.id)
  if (!course) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price - (price * discount) / 100
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" priority />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Course Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Price</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(calculateDiscountedPrice(course.price, course.discount))}
                  </span>
                  {course.discount && (
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(course.price)}</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="flex gap-2">
                  <Badge variant={course.status ? "success" : "secondary"}>{course.status ? "Active" : "Draft"}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                <div className="flex items-start gap-4">
                  <Image
                    src={course.teacherId.avartar || "/placeholder.svg"}
                    alt={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="space-y-2">
                    <div>
                      <div className="font-medium">
                        {course.teacherId.firstName} {course.teacherId.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">{course.teacherId.role}</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.teacherId.major.map((major, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                          style={{ backgroundColor: major.color + "20", color: major.color }}
                        >
                          {major.name}
                        </span>
                      ))}
                    </div>
                    {course.teacherId.educationLevel && (
                      <div className="text-sm">Education: {course.teacherId.educationLevel}</div>
                    )}
                    {course.teacherId.experienceYears && (
                      <div className="text-sm">Experience: {course.teacherId.experienceYears} years</div>
                    )}
                    <div className="flex gap-2">
                      <Badge variant={course.teacherId.isActive ? "success" : "destructive"}>
                        {course.teacherId.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {course.teacherId.isClose && <Badge variant="destructive">Closed</Badge>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

