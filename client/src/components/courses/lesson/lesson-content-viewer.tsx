"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LessonContent } from "@/types/Lesson"
import { FileText, VideoIcon } from "lucide-react"

interface LessonContentViewerProps {
  contents: LessonContent[]
}

export default function LessonContentViewer({ contents }: LessonContentViewerProps) {
  const [activeContent, setActiveContent] = useState<string>(contents[0]?._id || "")

  const videoContents = contents.filter((content) => content.contentType === "video")
  const documentContents = contents.filter((content) => content.contentType === "document")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lesson Materials</CardTitle>
        <CardDescription>View videos and documents for this lesson</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="videos" className="space-y-4">
            {videoContents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {videoContents.map((content) => (
                    <Card
                      key={content._id}
                      className={`cursor-pointer hover:border-primary transition-colors ${
                        activeContent === content._id ? "border-primary" : ""
                      }`}
                      onClick={() => setActiveContent(content._id)}
                    >
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm flex items-center">
                          <VideoIcon className="h-4 w-4 mr-2" />
                          {content.title}
                        </CardTitle>
                        {content.duration && <CardDescription>{content.duration} minutes</CardDescription>}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                {activeContent && (
                  <div className="mt-6">
                    <video
                      controls
                      className="w-full rounded-md"
                      src={videoContents.find((content) => content._id === activeContent)?.url || ""}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No video content available for this lesson</div>
            )}
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            {documentContents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentContents.map((content) => (
                  <a
                    key={content._id}
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <Card className="cursor-pointer hover:border-primary transition-colors h-full">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {content.title}
                        </CardTitle>
                        <CardDescription>{content.documentType?.toUpperCase()}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        {content.description && <p className="text-sm">{content.description}</p>}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No document content available for this lesson
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

