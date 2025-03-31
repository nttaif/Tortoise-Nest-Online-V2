"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Clock, Loader2, Users } from "lucide-react"
import JitsiMeetContainer from "@/components/jitsi-meet/jitsi-container"
import LiveClassParticipants from "@/components/teacher/live-class-participants"
import LiveClassChat from "@/components/teacher/live-class-chat"
import LiveClassFallback from "@/components/teacher/live-class-fallback"
import type { LessonSchedule } from "@/types/Lesson"
import { format } from "date-fns"

// Mock function to get schedule by ID
const getScheduleById = async (scheduleId: string): Promise<LessonSchedule | null> => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Today's date for the schedule
  const today = new Date()
  today.setHours(10, 0, 0, 0)
  const endTime = new Date(today)
  endTime.setHours(11, 0, 0, 0)

  // Mock schedule data with realistic IDs and structure
  return {
    _id: scheduleId,
    lessonId: {
      _id: "67e4134b57885d8aac95f2e8",
      courseId: "67d664c2b90b8dbec6d342ed",
      title: "Introduction to React",
      description: "Learn the basics of React and how to create components",
      contents: [
        {
          _id: "67e4134b57885d8aac95f2e9",
          title: "React Fundamentals",
          description: "Introduction to React concepts",
          contentType: "video",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 15,
          createdAt: "2025-03-26T14:46:35.813Z",
          updatedAt: "2025-03-26T14:46:35.813Z",
        },
      ],
      order: 1,
      createdAt: "2025-03-26T14:46:35.816Z",
      updatedAt: "2025-03-26T14:46:35.816Z",
    },
    teacherId: {
      _id: "67d65ff8b90b8dbec6d342a5",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      avartar: "/placeholder.svg?height=200&width=200",
      role: "teacher",
      major: [{ name: "Computer Science", color: "blue" }],
      isActive: true,
      isClose: false,
      createdAt: "2025-03-20T10:30:45.123Z",
      updatedAt: "2025-03-20T10:30:45.123Z",
    },
    startTime: today.toISOString(),
    endTime: endTime.toISOString(),
    meetingId: `meeting-${scheduleId}`,
    status: "ongoing",
    createdAt: "2025-03-26T14:46:35.813Z",
    updatedAt: "2025-03-26T14:46:35.813Z",
  }
}

// Mock participants data with realistic structure
const mockParticipants = [
  { id: "67d65ff9b90b8dbec6d342b1", name: "Alice Smith", role: "student", isActive: true },
  { id: "67d65ff9b90b8dbec6d342b2", name: "Bob Johnson", role: "student", isActive: true },
  { id: "67d65ff9b90b8dbec6d342b3", name: "Carol Williams", role: "student", isActive: false },
  { id: "67d65ff9b90b8dbec6d342b4", name: "David Brown", role: "student", isActive: true },
]

export default function TeacherLiveClassPage({ params }: { params: { scheduleId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [schedule, setSchedule] = useState<LessonSchedule | null>(null)
  const [participants, setParticipants] = useState(mockParticipants)
  const [isLoading, setIsLoading] = useState(true)
  const [jitsiError, setJitsiError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true)
        const data = await getScheduleById(params.scheduleId)
        setSchedule(data)

        // Update schedule status to ongoing if it's not already
        if (data && data.status !== "ongoing") {
          // In a real app, this would be an API call
          console.log("Updating schedule status to ongoing")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load class information. Please try again.",
          variant: "destructive",
        })
        setJitsiError("Failed to load class information")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedule()
  }, [params.scheduleId, toast])

  const handleEndClass = async () => {
    try {
      // In a real app, this would be an API call to update the schedule status
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Class ended",
        description: "The class has been marked as completed.",
      })

      // Navigate back to the schedule page
      router.push(
        `/teacher/courses/${typeof schedule?.lessonId === "object" ? schedule.lessonId.courseId : "67d664c2b90b8dbec6d342ed"}/schedule`,
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end the class. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRetryJitsi = () => {
    setJitsiError(null)
    // Force a re-render of the Jitsi component
    setSchedule((prev) => {
      if (!prev) return null
      return { ...prev, meetingId: `${prev.meetingId}-retry-${Date.now()}` }
    })
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading class information...</p>
        </div>
      </div>
    )
  }

  if (!schedule) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <p className="text-lg font-medium mb-4">Class not found</p>
          <p className="text-muted-foreground mb-6">Please check the URL and try again.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const teacherName =
    typeof schedule.teacherId === "object"
      ? `${schedule.teacherId.firstName} ${schedule.teacherId.lastName}`
      : "Teacher"

  const lessonTitle = typeof schedule.lessonId === "object" ? schedule.lessonId.title : "Lesson"

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <div onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </div>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{lessonTitle}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {format(new Date(schedule.startTime), "PPP")} at {format(new Date(schedule.startTime), "h:mm a")}
                </span>
                <Badge variant="outline" className="ml-2">
                  Live
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="destructive" onClick={handleEndClass}>
            End Class
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-0">
                {jitsiError ? (
                  <LiveClassFallback onRetry={handleRetryJitsi} error={jitsiError} />
                ) : (
                  <JitsiMeetContainer
                    roomName={schedule.meetingId || `class-${schedule._id}`}
                    displayName={teacherName}
                    isTeacher={true}
                    onClose={() => {
                      toast({
                        title: "Video conference closed",
                        description: "You've left the video conference. The class is still ongoing.",
                      })
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Class Controls</span>
                  <Badge className="ml-2">
                    <Users className="h-3 w-3 mr-1" />
                    {participants.filter((p) => p.isActive).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="participants">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>
                  <TabsContent value="participants" className="p-4">
                    <LiveClassParticipants participants={participants} />
                  </TabsContent>
                  <TabsContent value="chat" className="p-4">
                    <LiveClassChat />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

