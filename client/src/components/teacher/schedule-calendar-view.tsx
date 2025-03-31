"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import type { LessonSchedule } from "@/types/Lesson"
import { format, isSameDay, isPast, isToday } from "date-fns"
import { CalendarClock, Clock, Edit, Play, Trash, Video } from "lucide-react"

// This is a Client Component
interface ScheduleCalendarViewProps {
  schedules: LessonSchedule[]
  courseId: string
  teacherName: string
}

export default function ScheduleCalendarView({ schedules, courseId, teacherName }: ScheduleCalendarViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSchedule, setSelectedSchedule] = useState<LessonSchedule | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Filter schedules for the selected date
  const filteredSchedules = selectedDate
    ? schedules.filter((schedule) => isSameDay(new Date(schedule.startTime), selectedDate))
    : []

  // Function to highlight dates with schedules
  const isDayWithSchedule = (date: Date) => {
    return schedules.some((schedule) => isSameDay(new Date(schedule.startTime), date))
  }

  const handleEditSchedule = (schedule: LessonSchedule) => {
    // Navigate to edit page
    const lessonId = typeof schedule.lessonId === "string" ? schedule.lessonId : schedule.lessonId._id
    router.push(`/teacher/courses/${courseId}/lessons/${lessonId}/schedule/${schedule._id}/edit`)
  }

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) return

    setIsDeleting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Schedule deleted",
        description: "The schedule has been deleted successfully.",
      })

      setShowDeleteDialog(false)
      setSelectedSchedule(null)
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Update the handleStartClass function to navigate to a dedicated page instead of using a dialog
  const handleStartClass = (schedule: LessonSchedule) => {
    // Navigate to the dedicated live class page
    router.push(`/teacher/live-class/${schedule._id}`)
  }

  const canStartClass = (schedule: LessonSchedule) => {
    const scheduleDate = new Date(schedule.startTime)
    // Allow starting class if it's today or in the past (for testing)
    return isToday(scheduleDate) || isPast(scheduleDate)
  }

  const getScheduleStatusClass = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 border-green-500 text-green-700"
      case "completed":
        return "bg-gray-100 border-gray-500 text-gray-700"
      case "cancelled":
        return "bg-red-100 border-red-500 text-red-700"
      default:
        return "bg-blue-100 border-blue-500 text-blue-700"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            withSchedule: (date) => isDayWithSchedule(date),
          }}
          modifiersStyles={{
            withSchedule: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--primary) / 0.1)",
              color: "hsl(var(--primary))",
            },
          }}
        />
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}
              </h3>
              <div className="text-sm text-muted-foreground">
                {filteredSchedules.length} {filteredSchedules.length === 1 ? "class" : "classes"} scheduled
              </div>
            </div>

            {filteredSchedules.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredSchedules.map((schedule) => (
                    <Card key={schedule._id} className={`border-l-4 ${getScheduleStatusClass(schedule.status)}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {typeof schedule.lessonId === "string" ? "Lesson" : schedule.lessonId.title}
                            </h4>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {format(new Date(schedule.startTime), "h:mm a")} -
                              {format(new Date(schedule.endTime), "h:mm a")}
                            </div>
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

                        <div className="flex justify-end gap-2 mt-4">
                          {canStartClass(schedule) &&
                            schedule.status !== "completed" &&
                            schedule.status !== "cancelled" && (
                              <Button
                                size="sm"
                                onClick={() => handleStartClass(schedule)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {schedule.status === "ongoing" ? (
                                  <>
                                    <Video className="h-3 w-3 mr-1" /> Join Live Class
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-3 w-3 mr-1" /> Start Class
                                  </>
                                )}
                              </Button>
                            )}
                          <Button variant="outline" size="sm" onClick={() => handleEditSchedule(schedule)}>
                            <Edit className="h-3 w-3 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setSelectedSchedule(schedule)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-3 w-3 mr-1" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No classes scheduled</h3>
                <p className="text-muted-foreground mt-1 mb-6">You don't have any classes scheduled for this date.</p>
                <Button asChild>
                  <a href="#create">
                    <CalendarClock className="mr-2 h-4 w-4" /> Create Schedule
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Schedule Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Schedule</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this schedule? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="py-4">
              <div className="font-medium">
                {typeof selectedSchedule.lessonId === "string" ? "Lesson" : selectedSchedule.lessonId.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(selectedSchedule.startTime), "PPP")} at{" "}
                {format(new Date(selectedSchedule.startTime), "h:mm a")}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchedule} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

