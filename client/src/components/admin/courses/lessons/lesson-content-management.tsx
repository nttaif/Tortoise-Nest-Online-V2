"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Video, FileText, Clock, ExternalLink, Loader2 } from "lucide-react"
import type { Lesson, LessonContent, ContentType, DocumentType } from "@/types/Lesson"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import LessonContentForm from "./lesson-content-form"
import { deleteLessonContent, updateLessonContent } from "@/components/common/action"

interface LessonContentManagementProps {
  lesson: Lesson
  onUpdateLesson: (lesson: Lesson) => void
}

export default function LessonContentManagement({ lesson, onUpdateLesson }: LessonContentManagementProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<LessonContent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateContent = async (content: LessonContent) => {
    try {
      setIsSubmitting(true)
      const updatedLesson = await updateLessonContent(lesson._id, content) as Lesson
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Nội dung đã được thêm",
          description: "Nội dung bài học đã được thêm thành công",
        })
      }
    } catch (error) {
      console.error("Error creating content:", error)
      toast({
        title: "Lỗi",
        description: "Không thể thêm nội dung bài học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditContent = async (content: LessonContent) => {
    if (!selectedContent) return

    try {
      setIsSubmitting(true)
      const updatedLesson = await updateLessonContent(lesson._id, content, selectedContent._id) as Lesson
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Nội dung đã được cập nhật",
          description: "Nội dung bài học đã được cập nhật thành công",
        })
      }
    } catch (error) {
      console.error("Error updating content:", error)
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật nội dung bài học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsEditDialogOpen(false)
      setSelectedContent(null)
    }
  }

  const handleDeleteContent = async () => {
    if (!selectedContent) return

    try {
      setIsSubmitting(true)
      const updatedLesson = await deleteLessonContent(lesson._id, selectedContent._id) as Lesson
      if (updatedLesson) {
        onUpdateLesson(updatedLesson)
        toast({
          title: "Nội dung đã được xóa",
          description: "Nội dung bài học đã được xóa thành công",
        })
      }
    } catch (error) {
      console.error("Error deleting content:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa nội dung bài học. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDeleteDialogOpen(false)
      setSelectedContent(null)
    }
  }

  const getContentTypeLabel = (type: ContentType) => {
    return type === "video" ? "Video" : "Tài liệu"
  }

  const getDocumentTypeLabel = (type?: DocumentType) => {
    if (!type) return ""

    switch (type) {
      case "word":
        return "Word"
      case "ppt":
        return "PowerPoint"
      case "pdf":
        return "PDF"
      default:
        return type
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Nội dung bài học</CardTitle>
              <CardDescription>Quản lý nội dung cho bài học: {lesson.title}</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm nội dung
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.contents && lesson.contents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Loại nội dung</TableHead>
                  <TableHead>Thời lượng</TableHead>
                  <TableHead>Liên kết</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lesson.contents.map((content) => (
                  <TableRow key={content._id}>
                    <TableCell className="font-medium">{content.title}</TableCell>
                    <TableCell>
                      <Badge variant={content.contentType === "video" ? "default" : "secondary"}>
                        {getContentTypeLabel(content.contentType)}
                        {content.documentType && ` (${getDocumentTypeLabel(content.documentType)})`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {content.duration ? (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          {content.duration} phút
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Mở liên kết
                      </a>
                    </TableCell>
                    <TableCell>{new Date(content.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedContent(content)
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
                            setSelectedContent(content)
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
                {lesson.contents && lesson.contents.length === 0 ? (
                  <FileText className="h-6 w-6 text-primary" />
                ) : (
                  <Video className="h-6 w-6 text-primary" />
                )}
              </div>
              <h3 className="text-lg font-semibold">Chưa có nội dung</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Bài học này chưa có nội dung nào. Hãy thêm nội dung để học viên có thể học.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm nội dung đầu tiên
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Content Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm nội dung mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết để thêm nội dung mới cho bài học</DialogDescription>
          </DialogHeader>
          <LessonContentForm
            onSubmit={handleCreateContent}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Content Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nội dung</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin nội dung bài học</DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <LessonContentForm
              content={selectedContent}
              onSubmit={handleEditContent}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setSelectedContent(null)
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
              Bạn có chắc chắn muốn xóa nội dung "{selectedContent?.title}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteContent} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

