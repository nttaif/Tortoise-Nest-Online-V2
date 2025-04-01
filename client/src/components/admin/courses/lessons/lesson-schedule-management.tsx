"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, Loader2, ExternalLink } from "lucide-react"
import type { Lesson, LessonSchedule } from "@/types/Lesson"
import type { Teacher } from "@/types/Teacher"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import LessonScheduleForm from "./lesson-schedule-form"
import { deleteLessonSchedule, getListTeacher, updateLessonSchedule } from "@/components/common/action"

interface LessonScheduleManagementProps {
  lesson: Lesson
  onUpdateLesson: (lesson: Lesson) => void
}

export default function LessonScheduleManagement({ lesson, onUpdateLesson }: LessonScheduleManagementProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<LessonSchedule | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoadingTeachers(true)
        const data = await getListTeacher()
        if (data && data.results) {
          setTeachers(data.results)
        }
      } catch (error) {
        console.error("Error fetching teachers:", error)
      } finally {
        setIsLoadingTeachers(false)
      }
    }

    fetchTeachers()
  }, [])

  const handleCreateSchedule = async (schedule: LessonSchedule) => {
    try {
      setIsSubmitting(true)
      const updatedLesson = await updateLessonSchedule(lesson._id, schedule) as Lesson
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Lịch học đã được thêm",
          description: "Lịch học đã được thêm thành công",
        })
      }
    } catch (error) {
      console.error("Error creating schedule:", error)
      toast({
        title: "Lỗi",
        description: "Không thể thêm lịch học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditSchedule = async (schedule: LessonSchedule) => {
    if (!selectedSchedule) return

    try {
      setIsSubmitting(true)
      const updatedLesson = await updateLessonSchedule(lesson._id, schedule, selectedSchedule._id) as Lesson
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Lịch học đã được cập nhật",
          description: "Lịch học đã được cập nhật thành công",
        })
      }
    } catch (error) {
      console.error("Error updating schedule:", error)
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật lịch học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsEditDialogOpen(false)
      setSelectedSchedule(null)
    }
  }

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) return

    try {
      setIsSubmitting(true)
      const updatedLesson = await deleteLessonSchedule(lesson._id, selectedSchedule._id) as Lesson;
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Lịch học đã được xóa",
          description: "Lịch học đã được xóa thành công",
        })
      }
    } catch (error) {
      console.error("Error deleting schedule:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa lịch học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDeleteDialogOpen(false)
      setSelectedSchedule(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Đã lên lịch</Badge>
      case "ongoing":
        return <Badge variant="default">Đang diễn ra</Badge>
      case "completed":
        return <Badge variant="secondary">Đã hoàn thành</Badge>
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTeacherName = (teacherId: string | Teacher) => {
    if (typeof teacherId === "object") {
      return `${teacherId.firstName} ${teacherId.lastName}`
    }

    const teacher = teachers.find((t) => t._id === teacherId)
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : teacherId.substring(0, 8)
  }

  if (isLoadingTeachers) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu giảng viên...</span>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch học</CardTitle>
              <CardDescription>Quản lý lịch học cho bài học: {lesson.title}</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm lịch học
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.scheduledTime && lesson.scheduledTime.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Thời gian bắt đầu</TableHead>
                  <TableHead>Thời gian kết thúc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Liên kết</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lesson.scheduledTime.map((schedule) => (
                  <TableRow key={schedule._id}>
                    <TableCell className="font-medium">{getTeacherName(schedule.teacherId)}</TableCell>
                    <TableCell>{formatDateTime(schedule.startTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.endTime)}</TableCell>
                    <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                    <TableCell>
                      {schedule.meetingUrl ? (
                        <a
                          href={schedule.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Tham gia
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedSchedule(schedule)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => {
                            setSelectedSchedule(schedule)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Chưa có lịch học</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Bài học này chưa có lịch học nào. Hãy thêm lịch học để học viên có thể tham gia.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm lịch học đầu tiên
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Schedule Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm lịch học mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết để thêm lịch học mới cho bài học</DialogDescription>
          </DialogHeader>
          <LessonScheduleForm
            teachers={teachers}
            onSubmit={handleCreateSchedule}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa lịch học</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin lịch học</DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <LessonScheduleForm
              schedule={selectedSchedule}
              teachers={teachers}
              onSubmit={handleEditSchedule}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setSelectedSchedule(null)
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lịch học này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchedule} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

