"use client"

import type React from "react"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { ChapterData } from "./chapter-creation-form"
import { useToast } from "@/hooks/use-toast"

interface ChapterCustomizationProps {
  chapterData: ChapterData
  setChapterData: React.Dispatch<React.SetStateAction<ChapterData>>
}

export function ChapterCustomization({ chapterData, setChapterData }: ChapterCustomizationProps) {
  const { toast } = useToast()
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [tempTitle, setTempTitle] = useState(chapterData.title)
  const [tempDescription, setTempDescription] = useState(chapterData.description)

  const handleTitleSave = () => {
    setChapterData((prev) => ({ ...prev, title: tempTitle }))
    setEditingTitle(false)
    toast({
      title: "Title updated",
      description: `Chapter title has been updated to: ${tempTitle}`,
    })
  }

  const handleDescriptionSave = () => {
    setChapterData((prev) => ({ ...prev, description: tempDescription }))
    setEditingDescription(false)
    toast({
      title: "Description updated",
      description: "Chapter description has been updated.",
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Chapter title</Label>
              <Button variant="ghost" size="sm" onClick={() => setEditingTitle(!editingTitle)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit title
              </Button>
            </div>

            {editingTitle ? (
              <div className="mt-2 space-y-2">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="Enter chapter title"
                />
                <Button size="sm" onClick={handleTitleSave}>
                  Save
                </Button>
              </div>
            ) : (
              <p className="mt-2">{chapterData.title || "No title"}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Chapter description</Label>
              <Button variant="ghost" size="sm" onClick={() => setEditingDescription(!editingDescription)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit description
              </Button>
            </div>

            {editingDescription ? (
              <div className="mt-2 space-y-2">
                <Textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  placeholder="Enter chapter description"
                  rows={4}
                />
                <Button size="sm" onClick={handleDescriptionSave}>
                  Save
                </Button>
              </div>
            ) : (
              <p className="mt-2 text-muted-foreground">{chapterData.description || "No description"}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

