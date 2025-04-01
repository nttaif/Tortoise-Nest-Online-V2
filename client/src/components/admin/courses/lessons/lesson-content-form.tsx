"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { LessonContent } from "@/types/Lesson"

const lessonContentFormSchema = z.object({
  title: z.string().min(3, {
    message: "Tiêu đề phải có ít nhất 3 ký tự",
  }),
  description: z.string().optional(),
  contentType: z.enum(["video", "document"], {
    required_error: "Vui lòng chọn loại nội dung",
  }),
  documentType: z.enum(["word", "ppt", "pdf"]).optional(),
  url: z.string().url({
    message: "Vui lòng nhập URL hợp lệ",
  }),
  duration: z.coerce.number().int().min(1).optional(),
})

type LessonContentFormValues = z.infer<typeof lessonContentFormSchema>

interface LessonContentFormProps {
  content?: LessonContent
  onSubmit: (content: LessonContent) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export default function LessonContentForm({
  content,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: LessonContentFormProps) {
  const form = useForm<LessonContentFormValues>({
    resolver: zodResolver(lessonContentFormSchema),
    defaultValues: {
      title: content?.title || "",
      description: content?.description || "",
      contentType: content?.contentType || "video",
      documentType: content?.documentType,
      url: content?.url || "",
      duration: content?.duration,
    },
  })

  const contentType = form.watch("contentType")

  // Reset documentType when contentType changes
  useEffect(() => {
    if (contentType === "video") {
      form.setValue("documentType", undefined)
    }
  }, [contentType, form])

  const handleSubmit = (values: LessonContentFormValues) => {
    const currentDate = new Date().toISOString()

    const newContent: LessonContent = {
      // _id: content?._id || `temp-${Date.now()}`, // Backend will generate real ID
      title: values.title,
      description: values.description,
      contentType: values.contentType,
      url: values.url,
      documentType: values.contentType === "document" ? values.documentType : undefined,
      duration: values.contentType === "video" ? values.duration : undefined,
      createdAt: content?.createdAt || currentDate,
      updatedAt: currentDate,
    }

    onSubmit(newContent)
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
                <Input placeholder="Nhập tiêu đề nội dung" {...field} />
              </FormControl>
              <FormDescription>Tiêu đề của nội dung sẽ hiển thị cho học viên</FormDescription>
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
                <Textarea placeholder="Nhập mô tả nội dung (tùy chọn)" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Mô tả ngắn gọn về nội dung</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại nội dung</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại nội dung" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Tài liệu</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Loại nội dung bài học</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {contentType === "document" && (
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại tài liệu</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại tài liệu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="word">Word</SelectItem>
                      <SelectItem value="ppt">PowerPoint</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Định dạng của tài liệu</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {contentType === "video" && (
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời lượng (phút)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>Thời lượng của video (phút)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Nhập URL nội dung" {...field} />
              </FormControl>
              <FormDescription>Liên kết đến {contentType === "video" ? "video" : "tài liệu"}</FormDescription>
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
            {content ? "Cập nhật" : "Thêm nội dung"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

