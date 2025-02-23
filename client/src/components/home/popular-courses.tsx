import { Button } from "@/components/ui/button"
import { CourseCard } from "./course-card"

const COURSES = [
  {
    id: 1,
    image: "/images/course-1.jpg",
    price: 40.0,
    level: "ADVANCED",
    lessons: 8,
    students: 16,
    title: "Starting SEO as your home-based business",
    rating: 4.9,
    duration: 3,
    href: "/courses/seo-business",
  },
  {
    id: 1,
    image: "/images/course-1.jpg",
    price: 40.0,
    level: "ADVANCED",
    lessons: 8,
    students: 16,
    title: "Starting SEO as your home-based business",
    rating: 4.9,
    duration: 3,
    href: "/courses/seo-business",
  },
  {
    id: 1,
    image: "/images/course-1.jpg",
    price: 40.0,
    level: "ADVANCED",
    lessons: 8,
    students: 16,
    title: "Starting SEO as your home-based business",
    rating: 4.9,
    duration: 3,
    href: "/courses/seo-business",
  },
  {
    id: 1,
    image: "/images/course-1.jpg",
    price: 40.0,
    level: "ADVANCED",
    lessons: 8,
    students: 16,
    title: "Starting SEO as your home-based business",
    rating: 4.9,
    duration: 3,
    href: "/courses/seo-business",
  },
  
  // Add more courses here...
]

export function PopularCourses() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#20B2AA] font-semibold uppercase tracking-wider">POPULAR COURSES</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Pick a course to <br />
            get started with your study
          </h2>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 rounded-full border px-6 py-3">
            <span className="text-gray-600">
              <span className="text-[#FF6B00] font-bold">23,000+</span> more skillful courses you can explore
            </span>
            <Button variant="default" className="rounded-full bg-[#1B1B1B] hover:bg-[#FF6B00]">
              EXPLORE ALL COURSES
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

