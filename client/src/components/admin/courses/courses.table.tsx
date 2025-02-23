"use client"

import type { Course } from "@/types/Courses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CourseTableProps {
  courses: Course[]
}

export function CourseTable({ courses: initialCourses }: CourseTableProps) {
  const [search, setSearch] = useState("")
  const [courses] = useState(initialCourses)

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()),
  )

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
        <p className="text-sm text-muted-foreground">
          Showing 1 to {filteredCourses.length} of {courses.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 font-medium">
          <div>COURSE DETAILS</div>
          <div>PRICE</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>
        <div className="divide-y">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <Link href={`/courses/${course._id}`} className="flex gap-4">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.name}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="font-medium hover:text-primary">{course.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={course.teacherId.avartar || "/placeholder.svg"}
                        alt={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-sm font-medium">
                              {course.teacherId.firstName} {course.teacherId.lastName}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Role:</span>
                                <span className="text-sm">{course.teacherId.role}</span>
                              </div>
                              {course.teacherId.educationLevel && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Education:</span>
                                  <span className="text-sm">{course.teacherId.educationLevel}</span>
                                </div>
                              )}
                              {course.teacherId.experienceYears && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Experience:</span>
                                  <span className="text-sm">{course.teacherId.experienceYears} years</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Email:</span>
                                <span className="text-sm">{course.teacherId.email}</span>
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
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                  </div>
                </div>
              </Link>
              <div className="text-right">
                <div className="font-medium">
                  {formatPrice(calculateDiscountedPrice(course.price, course.discount))}
                </div>
                {course.discount && (
                  <div className="text-sm text-muted-foreground line-through">{formatPrice(course.price)}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant={course.status ? "success" : "secondary"} className="capitalize">
                  {course.status ? "Active" : "Draft"}
                </Badge>
                <Badge variant={course.teacherId.isActive ? "success" : "destructive"} className="capitalize">
                  Teacher: {course.teacherId.isActive ? "Active" : "Inactive"}
                </Badge>
                {course.teacherId.isClose && (
                  <Badge variant="destructive" className="capitalize">
                    Closed
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

