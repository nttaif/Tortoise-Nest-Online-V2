import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText, Lock, Play, VideoIcon } from "lucide-react"
import type { Lesson } from "@/types/Lesson"

// This is a Server Component
interface CourseLessonsListProps {
  lessons: Lesson[]
  courseId: string
  userEnrolled?: boolean
}

export default function CourseLessonsList({ lessons, courseId, userEnrolled = false }: CourseLessonsListProps) {
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order)
  return (
    <div className="space-y-4">
      {sortedLessons.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {sortedLessons.map((lesson, index) => {
            const videoContents = lesson.contents?.filter((c) => c.contentType === "video") || []
            const documentContents = lesson.contents?.filter((c) => c.contentType === "document") || []
            const totalDuration = lesson.contents?.reduce((acc, content) => acc + (content.duration || 0), 0) || 0

            return (
              <AccordionItem key={lesson._id} value={`lesson-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-start justify-between w-full text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {index + 1}. {lesson.title}
                      </span>
                      {!userEnrolled && index > 0 && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{totalDuration} min</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-3">
                    {lesson.contents?.map((content, contentIndex) => (
                      <div key={content._id} className="flex items-center justify-between py-2 border-b border-border">
                        <div className="flex items-center gap-2">
                          {content.contentType === "video" ? (
                            <VideoIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{content.title}</span>
                          {content.contentType === "document" && content.documentType && (
                            <Badge variant="outline" className="text-xs">
                              {content.documentType.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {content.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{content.duration} min</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {lesson.scheduledTime && lesson.scheduledTime.length > 0 && (
                      <div className="mt-4 pt-2">
                        <h4 className="text-sm font-medium mb-2">Live Sessions</h4>
                        <div className="space-y-2">
                          {lesson.scheduledTime.map((schedule) => (
                            <div key={schedule._id} className="flex items-center justify-between text-sm">
                              <div>
                                {new Date(schedule.startTime).toLocaleDateString()} at{" "}
                                {new Date(schedule.startTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                              <Badge
                                variant={
                                  schedule.status === "scheduled"
                                    ? "outline"
                                    : schedule.status === "ongoing"
                                      ? "default"
                                      : schedule.status === "completed"
                                        ? "secondary"
                                        : "destructive"
                                }
                              >
                                {schedule.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3">
                      <Button
                        asChild
                        variant={userEnrolled || index === 0 ? "default" : "outline"}
                        disabled={!userEnrolled && index > 0}
                      >
                        <Link href={`/courses/${courseId}/lessons/${lesson._id}`}>
                          {userEnrolled || index === 0 ? (
                            <span className="flex items-center gap-2">
                              <Play className="h-4 w-4" />
                              Start Lesson
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Enroll to Unlock
                            </span>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      ) : (
        <div className="text-center py-8 text-muted-foreground">No lessons available for this course yet.</div>
      )}
    </div>
  )
}

