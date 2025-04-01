"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Search, Edit, Trash2, FileText, Calendar, Loader2 } from "lucide-react"
import type { Lesson } from "@/types/Lesson"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import LessonForm from "./lesson-form"
import { removeLesson } from "@/components/common/action"

interface LessonListProps {
  lessons: Lesson[]
  onSelectLesson: (lesson: Lesson) => void
  onCreateLesson: (lesson: Lesson) => void
  onDeleteLesson: (lessonId: string) => void
}

export default function LessonList({ lessons, onSelectLesson, onCreateLesson, onDeleteLesson }: LessonListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof lesson.courseId === "object" && lesson.courseId.name?.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDeleteClick = (lessonId: string) => {
    setLessonToDelete(lessonId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return

    try {
      setIsDeleting(true)
      await removeLesson(lessonToDelete)
      onDeleteLesson(lessonToDelete)
      toast({
        title: "Bài học đã được xóa",
        description: "Bài học đã được xóa thành công",
      })
    } catch (error) {
      console.error("Error deleting lesson:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa bài học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setLessonToDelete(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách bài học</CardTitle>
              <CardDescription>Quản lý tất cả bài học trong hệ thống</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm bài học
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm bài học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Khóa học</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Lịch học</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Không tìm thấy bài học nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredLessons.map((lesson) => (
                  <TableRow key={lesson._id}>
                    <TableCell className="font-medium">{lesson.title}</TableCell>
                    <TableCell>
                      {typeof lesson.courseId === "object" ? lesson.courseId.name : lesson.courseId.substring(0, 8)}
                    </TableCell>
                    <TableCell>{lesson.order}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lesson.contents?.length || 0} nội dung</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lesson.scheduledTime?.length || 0} lịch học</Badge>
                    </TableCell>
                    <TableCell>{new Date(lesson.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onSelectLesson(lesson)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              onSelectLesson(lesson)
                              setTimeout(
                                () =>
                                  document
                                    .querySelector('[data-value="content"]')
                                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
                                0,
                              )
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Quản lý nội dung
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              onSelectLesson(lesson)
                              setTimeout(
                                () =>
                                  document
                                    .querySelector('[data-value="schedule"]')
                                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
                                0,
                              )
                            }}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Quản lý lịch học
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(lesson._id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Lesson Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm bài học mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết để tạo bài học mới</DialogDescription>
          </DialogHeader>
          <LessonForm
            onSubmit={(lesson) => {
              onCreateLesson(lesson)
              setIsCreateDialogOpen(false)
            }}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài học này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

