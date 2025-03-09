import { Suspense } from "react"
import CourseList from "@/components/courses/course-list"
import { CourseListSkeleton } from "@/components/courses/course-list-skeleton"
import { getCourses } from "@/lib/courses"

interface CoursesPageProps {
  searchParams: {
    page?: string
  }
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const currentPage = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const coursesPerPage = 10

  const { courses, totalPages } = await getCourses(currentPage, coursesPerPage)

  return (
    <div className="container mx-auto py-10">
      <div className="relative bg-gray-100 py-4 px-8">
                <div className="relative w-full h-[250px]">
                    <img src="/images/bg.png" alt="Background Image" className=" object-cover" />
                    <img src="/images/ic1.png" alt="Icon" className="absolute top-10 left-32 w-16 h-16 animate-bounce" />
                    <img src="/images/ic2.png" alt="Icon 2" className="absolute top-2 right-4 h-[256] w-[450px]" />
                    <img src="/images/ic3.png" alt="Icon 3" className="absolute top-24 right-96 " />
                    <img src="/images/ic4.png" alt="Icon 4" className="absolute top-44 right-64 " />
                    <img src="/images/ic5.png" alt="Icon 5" className="absolute top-6 right-28 " />

                    <h1 className="absolute top-1/2 left-8 transform -translate-y-1/2 text-5xl sm:text-6xl font-bold text-black">
                        All Courses
                    </h1>
                    <div className="absolute top-[70%] left-8 font-bold flex items-center gap-2 text-gray-500 text-lg mt-4">
                        <span>Home</span>
                        <span className="text-gray-400">&gt;</span>
                        <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Courses</span>
                    </div>
                </div>
          </div>
      <h1 className="text-3xl font-bold mb-6">Khóa học của chúng tôi</h1>
      <Suspense fallback={<CourseListSkeleton />}>
        <CourseList initialCourses={courses} currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  )
}

