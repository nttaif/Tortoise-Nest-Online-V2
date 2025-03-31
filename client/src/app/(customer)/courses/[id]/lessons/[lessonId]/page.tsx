"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import LessonContentViewer from "@/components/courses/lesson/lesson-content-viewer";
import JitsiMeetContainer from "@/components/jitsi-meet/jitsi-container";
import type { Lesson } from "@/types/Lesson";
import { format } from "date-fns";
import { getLessonById } from "@/components/common/action";

export default function LessonPage() {
  const params = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [showMeeting, setShowMeeting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getLesson() {
    setIsLoading(true);
    setError(null);
    const lessonId = params.lessonId as string;
    if (lessonId) {
      try {
        const result = await getLessonById(lessonId) as Lesson;
      console.log("lessonId", result);

        if (result) {
          setLesson(result);
        } else {
          setError("Lesson not found");
        }
      } catch (err) {
        setError("Failed to fetch lesson");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Invalid lesson ID");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLesson();
  }, [params.lessonId]);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-[400px]">
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-[400px]">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-[400px]">
          <p>Lesson not found</p>
        </div>
      </div>
    );
  }

  const nextSchedule =
    lesson.scheduledTime && lesson.scheduledTime.length > 0
      ? lesson.scheduledTime.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0]
      : null;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-muted-foreground mt-2">{lesson.description}</p>
          </div>
          {nextSchedule && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Next class: {format(new Date(nextSchedule.startTime), "PPP")}</span>
            </Badge>
          )}
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="content">Lesson Content</TabsTrigger>
            <TabsTrigger value="live">Live Session</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <LessonContentViewer contents={lesson.contents} />
          </TabsContent>

          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Live Class Session</CardTitle>
                <CardDescription>Join the live class or view upcoming sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {nextSchedule ? (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium">Next Scheduled Class</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(nextSchedule.startTime), "PPPP")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(new Date(nextSchedule.startTime), "h:mm a")} -
                          {format(new Date(nextSchedule.endTime), "h:mm a")}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {showMeeting ? (
                      <JitsiMeetContainer
                        roomName={nextSchedule.meetingId || `class-${nextSchedule._id}`}
                        displayName="Student Name"
                        onClose={() => setShowMeeting(false)}
                      />
                    ) : (
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          onClick={() => setShowMeeting(true)}
                          disabled={nextSchedule.status === "cancelled" || nextSchedule.status === "completed"}
                        >
                          Join Live Class
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming live sessions scheduled for this lesson.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}