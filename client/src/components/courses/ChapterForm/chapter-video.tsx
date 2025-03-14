"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ChapterData } from "./chapter-creation-form"
import { useToast } from "@/hooks/use-toast"

interface ChapterVideoProps {
  chapterData: ChapterData
  setChapterData: React.Dispatch<React.SetStateAction<ChapterData>>
}

export function ChapterVideo({ chapterData, setChapterData }: ChapterVideoProps) {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // In a real application, you would upload to your backend/storage
      const videoUrl = URL.createObjectURL(file)
      setChapterData((prev) => ({ ...prev, videoUrl }))

      toast({
        title: "Video uploaded successfully",
        description: `Uploaded: ${file.name}`,
      })
    } catch (error) {
      toast({
        title: "Error uploading video",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-medium">Chapter video</Label>
            <Label htmlFor="video-upload" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={isUploading}
                onClick={() => document.getElementById('video-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload video"}
                </Button>
              </div>
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
                disabled={isUploading}
              />
            </Label>
          </div>

          {chapterData.videoUrl ? (
            <div className="aspect-video relative rounded-md overflow-hidden border">
              <video src={chapterData.videoUrl} controls className="w-full h-full" />
            </div>
          ) : (
            <div className="aspect-video bg-slate-200 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No video uploaded</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            Videos can take a few minutes to process. Refresh the page if video does not appear.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

