"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LessonList from "./lesson-list"
import LessonDetail from "./lesson-detail"
import LessonScheduleManagement from "./lesson-schedule-management"
import type { Lesson } from "@/types/Lesson"
import { Loader2 } from "lucide-react"
import LessonContentManagement from "./lesson-content-management"
import { getLessons } from "@/components/common/action"

export default function LessonManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        const data = await getLessons()
        if (data) {
          setLessons(data)
        } else {
          setError("Không thể tải dữ liệu bài học")
        }
      } catch (err) {
        console.error("Error fetching lessons:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu bài học")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setActiveTab("detail")
  }

  const handleLessonUpdate = (updatedLesson: Lesson) => {
    setLessons(lessons.map((lesson) => (lesson._id === updatedLesson._id ? updatedLesson : lesson)))
    setSelectedLesson(updatedLesson)
  }

  const handleLessonCreate = (newLesson: Lesson) => {
    setLessons([...lessons, newLesson])
    setSelectedLesson(newLesson)
    setActiveTab("detail")
  }

  const handleLessonDelete = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson._id !== lessonId))
    if (selectedLesson && selectedLesson._id === lessonId) {
      setSelectedLesson(null)
      setActiveTab("list")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu bài học...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <h3 className="text-lg font-medium">Lỗi</h3>
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="list">Danh sách bài học</TabsTrigger>
        <TabsTrigger value="detail" disabled={!selectedLesson}>
          Chi tiết bài học
        </TabsTrigger>
        <TabsTrigger value="content" disabled={!selectedLesson}>
          Nội dung bài học
        </TabsTrigger>
        <TabsTrigger value="schedule" disabled={!selectedLesson}>
          Lịch học
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="space-y-4">
        <LessonList
          lessons={lessons}
          onSelectLesson={handleLessonSelect}
          onCreateLesson={handleLessonCreate}
          onDeleteLesson={handleLessonDelete}
        />
      </TabsContent>

      <TabsContent value="detail" className="space-y-4">
        {selectedLesson && <LessonDetail lesson={selectedLesson} onUpdateLesson={handleLessonUpdate} />}
      </TabsContent>

      <TabsContent value="content" className="space-y-4">
        {selectedLesson && <LessonContentManagement lesson={selectedLesson} onUpdateLesson={handleLessonUpdate} />}
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4">
        {selectedLesson && <LessonScheduleManagement lesson={selectedLesson} onUpdateLesson={handleLessonUpdate} />}
      </TabsContent>
    </Tabs>
  )
}

