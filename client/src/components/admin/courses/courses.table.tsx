"use client"
import type { Course } from "@/types/Courses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditCourseDialog } from "./edit.courses.dialog"
import { Teacher } from "@/types/Teacher"

interface CourseTableProps {
  teacher:Teacher[],
  courses: Course[]
}

export function CourseTable({ courses: initialCourses ,teacher}: CourseTableProps) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [courses] = useState(initialCourses)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
 
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCourses.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + pageSize)

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-[300px]"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[600px]">Courses Details</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <Link href={`/courses/${course._id}`} className="flex gap-4">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.name}
                      width={100}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                    <div className="space-y-2">
                      <h3 className="font-medium hover:text-primary">{course.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={course.teacherId?.avartar || "/placeholder.svg"}
                            alt={`${course.teacherId?.firstName} ${course.teacherId?.lastName}`}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-sm font-medium">
                                  {course.teacherId?.firstName} {course.teacherId?.lastName}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="w-80">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Role:</span>
                                    <span className="text-sm">{course.teacherId?.role}</span>
                                  </div>
                                  {course.teacherId?.educationLevel && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">Education:</span>
                                      <span className="text-sm">{course.teacherId?.educationLevel}</span>
                                    </div>
                                  )}
                                  {course.teacherId?.experienceYears && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">Experience:</span>
                                      <span className="text-sm">{course.teacherId?.experienceYears} years</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Email:</span>
                                    <span className="text-sm">{course.teacherId?.email}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {course.teacherId?.major.map((major, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                                        style={{ backgroundColor: major.color + "20", color: major.color }}
                                      >
                                        {major.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="flex flex-wrap gap-1">
                        
                            <span
                              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                              style={{ backgroundColor: '#FF5555' + "20", color: '#FF5555' }}
                            >
                              {course.category}
                            </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="text-left">
                    <div className="font-medium">
                      {formatPrice(calculateDiscountedPrice(course.price, course.discount))}
                    </div>
                    {course.discount && (
                      <div className="text-sm text-muted-foreground line-through">{formatPrice(course.price)}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant={course.status ? "success" : "secondary"} className="capitalize">
                      {course.status ? "Active" : "Draft"}
                    </Badge>
                    <Badge variant={course.teacherId?.isActive ? "success" : "destructive"} className="capitalize">
                      Teacher: {course.teacherId?.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {course.teacherId?.isClose && (
                      <Badge variant="destructive" className="capitalize">
                        Closed
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingCourse(course)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredCourses.length)} of{" "}
          {filteredCourses.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        {editingCourse && (
        <EditCourseDialog
          course={editingCourse}
          teachers={teacher}
          open={!!editingCourse}
          onOpenChange={(open) => !open && setEditingCourse(null)}
        />
      )}
      </div>
    </div>
  )
}

