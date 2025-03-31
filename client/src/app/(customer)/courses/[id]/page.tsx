import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getCourseById } from "@/lib/courses"
import CourseDetails from "@/components/courses/course-details"
import { CourseDetailsSkeleton } from "@/components/courses/course-details-skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await auth();
  const courseId = await params.id
  const course = await getCourseById(courseId)
  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto mt-10 ">
      <Link href="/courses">
        <Button variant="default" className="mb-6 pl-0 flex items-center gap-1">
          <ArrowLeft className="h-4 w-4 ml-4 " />
          Quay lại danh sách khóa học
        </Button>
      </Link>
      <Suspense fallback={<CourseDetailsSkeleton />}>
        <CourseDetails course={course} userID ={session?.user.id}/>
      </Suspense>
    </div>
  )
}

