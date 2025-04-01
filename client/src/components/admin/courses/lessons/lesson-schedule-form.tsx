"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { LessonSchedule } from "@/types/Lesson"
import type { Teacher } from "@/types/Teacher"

const lessonScheduleFormSchema = z.object({
  teacherId: z.string({
    required_error: "Vui lòng chọn giảng viên",
  }),
  startTime: z.string({
    required_error: "Vui lòng chọn thời gian bắt đầu",
  }),
  endTime: z.string({
    required_error: "Vui lòng chọn thời gian kết thúc",
  }),
  meetingUrl: z
    .string()
    .url({
      message: "Vui lòng nhập URL hợp lệ",
    })
    .optional(),
  meetingId: z.string().optional(),
  status: z.enum(["scheduled", "ongoing", "completed", "cancelled"], {
    required_error: "Vui lòng chọn trạng thái",
  }),
})

type LessonScheduleFormValues = z.infer<typeof lessonScheduleFormSchema>

interface LessonScheduleFormProps {
  schedule?: LessonSchedule
  teachers: Teacher[]
  onSubmit: (schedule: LessonSchedule) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export default function LessonScheduleForm({
  schedule,
  teachers,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: LessonScheduleFormProps) {
  const form = useForm<LessonScheduleFormValues>({
    resolver: zodResolver(lessonScheduleFormSchema),
    defaultValues: {
      teacherId: typeof schedule?.teacherId === "object" ? schedule.teacherId._id : schedule?.teacherId || "",
      startTime: schedule?.startTime ? new Date(schedule.startTime).toISOString().slice(0, 16) : "",
      endTime: schedule?.endTime ? new Date(schedule.endTime).toISOString().slice(0, 16) : "",
      meetingUrl: schedule?.meetingUrl || "",
      meetingId: schedule?.meetingId || "",
      status: schedule?.status || "scheduled",
    },
  })

  const handleSubmit = (values: LessonScheduleFormValues) => {
    const currentDate = new Date().toISOString()

    const newSchedule: LessonSchedule = {
      // _id: schedule?._id || `temp-${Date.now()}`, // Backend will generate real ID
      lessonId: schedule?.lessonId || `temp-lesson-${Date.now()}`, // Will be set by backend
      teacherId: values.teacherId,
      startTime: values.startTime,
      endTime: values.endTime,
      meetingUrl: values.meetingUrl,
      meetingId: values.meetingId,
      status: values.status as "scheduled" | "ongoing" | "completed" | "cancelled",
      createdAt: schedule?.createdAt || currentDate,
      updatedAt: currentDate,
    }

    onSubmit(newSchedule)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giảng viên</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giảng viên" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.firstName} {teacher.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Giảng viên phụ trách buổi học</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian bắt đầu</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>Thời gian bắt đầu buổi học</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian kết thúc</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>Thời gian kết thúc buổi học</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="meetingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL cuộc họp</FormLabel>
              <FormControl>
                <Input placeholder="Nhập URL cuộc họp (tùy chọn)" {...field} />
              </FormControl>
              <FormDescription>Liên kết đến cuộc họp trực tuyến (Jitsi, Zoom, v.v.)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meetingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID cuộc họp</FormLabel>
              <FormControl>
                <Input placeholder="Nhập ID cuộc họp (tùy chọn)" {...field} />
              </FormControl>
              <FormDescription>ID của cuộc họp trực tuyến (nếu có)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                  <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Trạng thái hiện tại của lịch học</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {schedule ? "Cập nhật" : "Thêm lịch học"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

