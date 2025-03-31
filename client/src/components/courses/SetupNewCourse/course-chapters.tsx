"use client"

import type React from "react"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Plus, ListChecks, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { Chapter, CourseData } from "@/components/courses/SetupNewCourse/course-creation-form"
import { useRouter } from "next/navigation";


interface CourseChaptersProps {
  chapters: Chapter[]
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>
}

export function CourseChapters({ chapters, setCourseData }: CourseChaptersProps) {
  const [isAddingChapter, setIsAddingChapter] = useState(false)
  const [newChapterTitle, setNewChapterTitle] = useState("")
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null)
  const [editingChapterTitle, setEditingChapterTitle] = useState("")
  const router = useRouter();


  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return

    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: newChapterTitle,
      isFree: false,
      isPublished: false,
    }

    setCourseData((prev) => ({
      ...prev,
      chapters: [...prev.chapters, newChapter],
    }))

    setNewChapterTitle("")
    setIsAddingChapter(false)
  }

  const handleEditChapter = (id: string) => {
    router.push(`SetupCoures/chapters/${id}`)
  }

  const handleSaveChapterEdit = () => {
    if (!editingChapterId || !editingChapterTitle.trim()) return

    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === editingChapterId ? { ...chapter, title: editingChapterTitle } : chapter,
      ),
    }))

    setEditingChapterId(null)
    setEditingChapterTitle("")
  }

  const handleToggleChapterFree = (id: string) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) => (chapter.id === id ? { ...chapter, isFree: !chapter.isFree } : chapter)),
    }))
  }

  const handleToggleChapterPublished = (id: string) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === id ? { ...chapter, isPublished: !chapter.isPublished } : chapter,
      ),
    }))
  }

  const handleDeleteChapter = (id: string) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((chapter) => chapter.id !== id),
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCourseData((prev) => ({
      ...prev,
      chapters: items,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-semibold">Course chapters</h2>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Course chapters</Label>
            <Button variant="outline" size="sm" onClick={() => setIsAddingChapter(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add a chapter
            </Button>
          </div>

          {isAddingChapter && (
            <div className="space-y-2">
              <Input
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                placeholder="Chapter title"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddChapter}>
                  Add
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsAddingChapter(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {chapters.length === 0 ? (
            <p className="text-muted-foreground text-sm">No chapters</p>
          ) : (
            <div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="chapters">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {chapters.map((chapter, index) => (
                        <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2 bg-slate-100 p-3 rounded-md"
                            >
                              <div {...provided.dragHandleProps} className="cursor-grab">
                                <GripVertical className="h-5 w-5 text-slate-500" />
                              </div>

                              <div className="flex-1">
                                {editingChapterId === chapter.id ? (
                                  <div className="space-y-2">
                                    <Input
                                      value={editingChapterTitle}
                                      onChange={(e) => setEditingChapterTitle(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={handleSaveChapterEdit}>
                                        Save
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => setEditingChapterId(null)}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <span>{chapter.title}</span>
                                    <div className="flex items-center gap-2">
                                      {chapter.isFree && (
                                        <Badge variant="outline" className="bg-black text-white">
                                          Free
                                        </Badge>
                                      )}
                                      {chapter.isPublished && (
                                        <Badge variant="outline" className="bg-sky-500 text-white">
                                          Published
                                        </Badge>
                                      )}
                                      <Button variant="ghost" size="sm" onClick={() => handleEditChapter(chapter.id)}>
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Switch
                                    checked={chapter.isFree}
                                    onCheckedChange={() => handleToggleChapterFree(chapter.id)}
                                    id={`free-${chapter.id}`}
                                  />
                                  <Label htmlFor={`free-${chapter.id}`} className="text-xs">
                                    Free
                                  </Label>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Switch
                                    checked={chapter.isPublished}
                                    onCheckedChange={() => handleToggleChapterPublished(chapter.id)}
                                    id={`published-${chapter.id}`}
                                  />
                                  <Label htmlFor={`published-${chapter.id}`} className="text-xs">
                                    Published
                                  </Label>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <p className="text-xs text-muted-foreground mt-2">Drag and drop to reorder chapters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

