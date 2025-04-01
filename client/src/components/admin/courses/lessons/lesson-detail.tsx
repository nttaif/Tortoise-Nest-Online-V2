"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Lesson } from "@/types/Lesson"
import LessonForm from "./lesson-form"

interface LessonDetailProps {
  lesson: Lesson
  onUpdateLesson: (lesson: Lesson) => void
}

export default function LessonDetail({ lesson, onUpdateLesson }: LessonDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết bài học</CardTitle>
        <CardDescription>Xem và chỉnh sửa thông tin bài học</CardDescription>
      </CardHeader>
      <CardContent>
        <LessonForm lesson={lesson} onSubmit={onUpdateLesson} onCancel={() => {}} />
      </CardContent>
    </Card>
  )
}

