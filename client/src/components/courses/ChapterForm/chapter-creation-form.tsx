"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, Video, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChapterCustomization } from "./chapter-customization"
import { ChapterAccess } from "./chapter-access"
import { ChapterVideo } from "./chapter-video"
import { useToast } from "@/hooks/use-toast"

export type ChapterData = {
  id: string
  title: string
  description: string
  isFree: boolean
  videoUrl: string
}

interface ChapterCreationFormProps {
  chapterId: string
}

export function ChapterCreationForm({ chapterId }: ChapterCreationFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [completedFields, setCompletedFields] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [chapterData, setChapterData] = useState<ChapterData>({
    id: chapterId,
    title: "",
    description: "",
    isFree: false,
    videoUrl: "",
  })

  // Load existing chapter data if available
  useEffect(() => {
    const loadChapterData = async () => {
      try {
        // In a real application, you would fetch the chapter data from your backend
        const storedData = localStorage.getItem(`chapter-${chapterId}`)
        if (storedData) {
          setChapterData(JSON.parse(storedData))
        }
      } catch (error) {
        console.error("Failed to load chapter data:", error)
      }
    }

    loadChapterData()
  }, [chapterId])

  // Update completed fields count
  useEffect(() => {
    let count = 0
    if (chapterData.title && chapterData.description) count++
    if (typeof chapterData.isFree === "boolean") count++
    if (chapterData.videoUrl) count++
    setCompletedFields(count)
  }, [chapterData])

  const isComplete = completedFields === 3

  const handleSave = async () => {
    if (!isComplete) return

    setIsSubmitting(true)

    try {
      // In a real application, you would save to your backend
      localStorage.setItem(`chapter-${chapterId}`, JSON.stringify(chapterData))

      toast({
        title: "Chapter saved successfully",
        description: "All changes have been saved.",
      })

      // Redirect back to course setup
      router.push("/admin/courses/SetupCoures")
    } catch (error) {
      toast({
        title: "Error saving chapter",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chapter Creation</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Complete all fields ({completedFields}/3)</span>
          <Button onClick={handleSave} disabled={!isComplete || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl font-semibold">Customize your chapter</h2>
          </div>
          <ChapterCustomization chapterData={chapterData} setChapterData={setChapterData} />

          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl font-semibold">Access Settings</h2>
          </div>
          <ChapterAccess chapterData={chapterData} setChapterData={setChapterData} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl font-semibold">Add a video</h2>
          </div>
          <ChapterVideo chapterData={chapterData} setChapterData={setChapterData} />
        </div>
      </div>
    </div>
  )
}

