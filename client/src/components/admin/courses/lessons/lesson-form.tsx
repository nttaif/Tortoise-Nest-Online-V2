"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Lesson } from "@/types/Lesson"
import type { Course } from "@/types/Courses"
import { addLesson, getAllCourses, updateLesson } from "@/components/common/action"

const lessonFormSchema = z.object({
  title: z.string().min(3, {
    message: "Tiêu đề phải có ít nhất 3 ký tự",
  }),
  description: z.string().optional(),
  courseId: z.string({
    required_error: "Vui lòng chọn khóa học",
  }),
  order: z.coerce.number().int().min(1, {
    message: "Thứ tự phải là số nguyên dương",
  }),
})

type LessonFormValues = z.infer<typeof lessonFormSchema>

interface LessonFormProps {
  lesson?: Lesson
  onSubmit: (lesson: Lesson) => void
  onCancel: () => void
}

export default function LessonForm({ lesson, onSubmit, onCancel }: LessonFormProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      title: lesson?.title || "",
      description: lesson?.description || "",
      courseId: typeof lesson?.courseId === "object" ? lesson.courseId._id : lesson?.courseId || "",
      order: lesson?.order || 1,
    },
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        const data = await getAllCourses()
        if (data) {
          setCourses(data as Course[])
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleSubmit = async (values: LessonFormValues) => {
    try {
      setIsSubmitting(true)
      let result

      if (lesson) {
        // Update existing lesson
        result = await updateLesson(lesson._id, {
          ...values,
          contents: lesson.contents,
          scheduledTime: lesson.scheduledTime,
        })
      } else {
        // Create new lesson
        result = await addLesson({
          ...values,
          contents: [],
          scheduledTime: [],
        })
      }

      if (result) {
        onSubmit(result)
      }
    } catch (error) {
      console.error("Error saving lesson:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề bài học" {...field} />
              </FormControl>
              <FormDescription>Tiêu đề của bài học sẽ hiển thị cho học viên</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập mô tả bài học (tùy chọn)" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Mô tả ngắn gọn về nội dung bài học</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khóa học" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Khóa học mà bài học này thuộc về</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thứ tự</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormDescription>Thứ tự hiển thị trong khóa học</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {lesson ? "Cập nhật" : "Tạo bài học"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

