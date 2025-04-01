import type { Metadata } from "next"
import LessonManagement from "@/components/admin/courses/lessons/lesson-management"

export const metadata: Metadata = {
  title: "Quản lý bài học | Hệ thống quản lý khóa học",
  description: "Quản lý bài học, nội dung và lịch học",
}

export default function LessonsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container grid items-start gap-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Quản lý bài học</h1>
              <p className="text-muted-foreground">Quản lý bài học, nội dung và lịch học cho các khóa học</p>
            </div>
          </div>

          <LessonManagement />
        </div>
      </div>
    </div>
  )
}

