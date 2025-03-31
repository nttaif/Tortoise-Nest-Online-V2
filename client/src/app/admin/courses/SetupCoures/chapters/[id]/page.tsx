import { ChapterCreationForm } from "@/components/courses/ChapterForm/chapter-creation-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChapterCreationPage({
  params,
}: {
  params: { chapterId: string }
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link href="/admin/courses/SetupCoures">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to course setup
        </Button>
      </Link>
      <ChapterCreationForm chapterId={params.chapterId} />
    </div>
  )
}

