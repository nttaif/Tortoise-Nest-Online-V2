"use client"

import type React from "react"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { ChapterData } from "./chapter-creation-form"
import { useToast } from "@/hooks/use-toast"

interface ChapterAccessProps {
  chapterData: ChapterData
  setChapterData: React.Dispatch<React.SetStateAction<ChapterData>>
}

export function ChapterAccess({ chapterData, setChapterData }: ChapterAccessProps) {
  const { toast } = useToast()

  const handleToggleFree = () => {
    setChapterData((prev) => ({ ...prev, isFree: !prev.isFree }))
    toast({
      title: "Access settings updated",
      description: `Chapter is now ${!chapterData.isFree ? "free" : "premium"} content.`,
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Chapter access</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {chapterData.isFree ? "This chapter is free for preview." : "This chapter is premium content."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={chapterData.isFree} onCheckedChange={handleToggleFree} id="free-access" />
            <Label htmlFor="free-access">Free chapter</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

