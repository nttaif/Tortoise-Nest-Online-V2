"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CalendarView from "@/components/schedule/calendar-view"
import ScheduleForm, { type ScheduleFormValues } from "@/components/schedule/schedule-form"
import type { Lesson, LessonSchedule } from "@/types/Lesson"
import { addMinutes, format } from "date-fns"
import { toast } from "@/hooks/use-toast"

// Mock data - replace with actual API calls in production
const mockLessons: Lesson[] = [
  {
    _id: "lesson1",
    courseId: "course1",
    title: "Introduction to React",
    description: "Learn the basics of React",
    contents: [],
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "lesson2",
    courseId: "course1",
    title: "Next.js Fundamentals",
    description: "Understanding Next.js framework",
    contents: [],
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock teacher data
const mockTeacher = {
  _id: "teacher1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  address: "123 Main St",
  avartar: "/placeholder.svg?height=200&width=200",
  role: "teacher",
  major: [{ name: "Computer Science", color: "blue" }],
  isActive: true,
  isClose: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export default function TeacherSchedulePage() {
  const [schedules, setSchedules] = useState<LessonSchedule[]>([])

  const handleScheduleSubmit = (data: ScheduleFormValues) => {
    // Combine date and time
    const startDateTime = new Date(data.date)
    const [hours, minutes] = data.startTime.split(":").map(Number)
    startDateTime.setHours(hours, minutes)

    // Calculate end time
    const endDateTime = addMinutes(startDateTime, data.duration)

    // Create new schedule
    const newSchedule: LessonSchedule = {
      _id: `schedule-${Date.now()}`,
      lessonId: mockLessons.find((lesson) => lesson._id === data.lessonId) || data.lessonId,
      teacherId: mockTeacher,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      meetingId: data.meetingId || `meeting-${Date.now()}`,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setSchedules([...schedules, newSchedule])

    toast({
      title: "Class Scheduled",
      description: `${format(startDateTime, "PPP")} at ${format(startDateTime, "h:mm a")}`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Teacher Schedule Management</h1>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="create">Create Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <CalendarView
            schedules={schedules}
            isTeacher={true}
            userName={`${mockTeacher.firstName} ${mockTeacher.lastName}`}
          />
        </TabsContent>

        <TabsContent value="create">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a New Class</CardTitle>
                <CardDescription>Create a new class schedule for your students</CardDescription>
              </CardHeader>
              <CardContent>
                <ScheduleForm lessons={mockLessons} onSubmit={handleScheduleSubmit} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your next 5 scheduled classes</CardDescription>
              </CardHeader>
              <CardContent>
                {schedules.length > 0 ? (
                  <div className="space-y-4">
                    {schedules
                      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                      .slice(0, 5)
                      .map((schedule) => (
                        <div key={schedule._id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">
                              {typeof schedule.lessonId === "string" ? "Lesson" : schedule.lessonId.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(schedule.startTime), "PPP")} at{" "}
                              {format(new Date(schedule.startTime), "h:mm a")}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">{schedule.status}</div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No upcoming classes scheduled</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

