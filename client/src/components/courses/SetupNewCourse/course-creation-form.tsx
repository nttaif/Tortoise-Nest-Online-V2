"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CourseCustomization } from "./course-customization"
import { CourseChapters } from "./course-chapters"
import { CoursePricing } from "./course-pricing"
import { CourseResources } from "./course-resources"
import { useIsMobile } from "@/hooks/use-mobile"

export type CourseData = {
  title: string
  description: string
  imageUrl: string
  chapters: Chapter[]
  price: number
  attachments: Attachment[]
}

export type Chapter = {
  id: string
  title: string
  isFree: boolean
  isPublished: boolean
}

export type Attachment = {
  id: string
  name: string
  url: string
}

export function CourseCreationForm() {
  const router = useRouter()
  const isMobile = useIsMobile()

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    imageUrl: "",
    chapters: [],
    price: 0,
    attachments: [],
  })

  const [completedFields, setCompletedFields] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update completed fields count
  useEffect(() => {
    let count = 0
    if (courseData.title) count++
    if (courseData.description) count++
    if (courseData.imageUrl) count++
    if (courseData.chapters.length >= 2) count++
    if (courseData.price > 0) count++
    if (courseData.attachments.length > 0) count++

    setCompletedFields(count)
  }, [courseData])

  const isComplete = completedFields === 6
  const hasMinimumChapters = courseData.chapters.length >= 2

  const handlePublish = async () => {
    if (!isComplete) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the course page after successful creation
      router.push("/teacher/courses")
    } catch (error) {
      console.error("Failed to publish course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Course setup</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Complete all fields ({completedFields}/6)
          </span>
          <Button onClick={handlePublish} disabled={!isComplete || isSubmitting} className="ml-auto">
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <Alert variant="destructive" className="bg-yellow-100 border-yellow-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>This course is unpublished. It will not be visible to students.</AlertDescription>
      </Alert>

      <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-8"}`}>
        <div className="space-y-6">
          <CourseCustomization courseData={courseData} setCourseData={setCourseData} />
        </div>

        <div className="space-y-6">
          <CourseChapters chapters={courseData.chapters} setCourseData={setCourseData} />

          <CoursePricing price={courseData.price} setCourseData={setCourseData} />

          <CourseResources attachments={courseData.attachments} setCourseData={setCourseData} />
        </div>
      </div>

      {!hasMinimumChapters && courseData.chapters.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>You need at least 2 chapters to publish this course.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

