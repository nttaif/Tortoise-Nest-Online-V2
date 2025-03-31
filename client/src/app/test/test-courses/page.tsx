"use client"

import { useState } from "react"
import { CourseCard } from "./component/course-card"
import { CourseAdapter } from "./adapter/course-adapter"
import { mockCourses } from "./data/mock-data"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SearchIcon, FilterIcon } from "lucide-react"

export default function CoursesPage() {
    //Call API get data
    const adaptedCourses = CourseAdapter.adaptMany(mockCourses)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    // Lọc dữ liệu chuyển đổi
    const categories = ["all", ...new Set(adaptedCourses.map((course) => course.category))]
    const filteredCourses = adaptedCourses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
        return matchesSearch && matchesCategory
    })
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Explore Courses</h1>
                <p className="mt-2 text-muted-foreground">Discover our wide range of courses taught by expert instructors</p>
            </div>

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4 text-muted-foreground" />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category === "all" ? "All Categories" : category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchTerm("")
                            setCategoryFilter("all")
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            {filteredCourses.length === 0 ? (
                <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                    <p className="text-lg font-medium">No courses found</p>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    )
}

