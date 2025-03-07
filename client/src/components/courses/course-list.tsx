"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { CourseCard } from "./course-card"
import { CourseFilter } from "./course-filter"
import { PaginationControl } from "./pagination-control"
import { Input } from "@/components/ui/input"
import type { Course } from "@/types/Courses"

interface CourseListProps {
  initialCourses: Course[]
  currentPage: number
  totalPages: number
}

export default function CourseList({ initialCourses, currentPage, totalPages }: CourseListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredTotalPages, setFilteredTotalPages] = useState(totalPages)
  const [isFiltering, setIsFiltering] = useState(false)

  // Get unique categories from courses
  const categories = Array.from(new Set(initialCourses.map((course) => course.category)))

  useEffect(() => {
    // Reset courses when initialCourses change (page change)
    if (!isFiltering) {
      setCourses(initialCourses)
    }
  }, [initialCourses, isFiltering])

  useEffect(() => {
    // Only filter locally if there's a search query or category filter
    if (searchQuery || selectedCategory) {
      setIsFiltering(true)
      let filteredCourses = [...initialCourses]

      // Filter by search query
      if (searchQuery) {
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Filter by category
      if (selectedCategory) {
        filteredCourses = filteredCourses.filter((course) => course.category === selectedCategory)
      }

      setCourses(filteredCourses)

      // In a real app, we would calculate this based on the total filtered results
      // For now, we'll just set it to 1 if there are results, or 0 if there are none
      setFilteredTotalPages(filteredCourses.length > 0 ? 1 : 0)
    } else {
      setIsFiltering(false)
      setFilteredTotalPages(totalPages)
    }
  }, [searchQuery, selectedCategory, initialCourses, totalPages])

  // Handle page change
  const handlePageChange = (page: number) => {
    // If filtering, don't change the URL
    if (isFiltering) return

    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams)

    // Set the page parameter
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }

    // Update the URL
    router.push(`${pathname}?${params.toString()}`)
  }

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setIsFiltering(false)
    setCourses(initialCourses)
    setFilteredTotalPages(totalPages)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Input
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <CourseFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {isFiltering && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Đang hiển thị kết quả lọc</p>
          <button onClick={clearFilters} className="text-sm text-primary hover:underline">
            Xóa bộ lọc
          </button>
        </div>
      )}

      {courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Không tìm thấy khóa học nào phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Only show pagination if we have more than 1 page and not filtering */}
      {(isFiltering ? filteredTotalPages : totalPages) > 1 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={isFiltering ? filteredTotalPages : totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

