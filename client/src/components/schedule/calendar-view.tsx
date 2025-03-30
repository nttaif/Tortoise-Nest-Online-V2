"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { LessonSchedule } from "@/types/Lesson"
import { format, isSameDay } from "date-fns"
import { CalendarClock, Clock } from "lucide-react"
import JitsiMeetContainer from "../jitsi-meet/jitsi-container"

interface CalendarViewProps {
  schedules: LessonSchedule[]
  isTeacher?: boolean
  userName: string
}

export default function CalendarView({ schedules, isTeacher = false, userName }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSchedule, setSelectedSchedule] = useState<LessonSchedule | null>(null)
  const [showMeeting, setShowMeeting] = useState(false)

  // Filter schedules for the selected date
  const filteredSchedules = selectedDate
    ? schedules.filter((schedule) => isSameDay(new Date(schedule.startTime), selectedDate))
    : []

  // Function to highlight dates with schedules
  const isDayWithSchedule = (date: Date) => {
    return schedules.some((schedule) => isSameDay(new Date(schedule.startTime), date))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Select a date to view scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}</CardTitle>
          <CardDescription>
            {filteredSchedules.length} {filteredSchedules.length === 1 ? "class" : "classes"} scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSchedules.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {filteredSchedules.map((schedule) => (
                  <Card key={schedule._id} className="border-l-4 border-l-primary">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {typeof schedule.lessonId === "string" ? "Lesson" : schedule.lessonId.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(new Date(schedule.startTime), "h:mm a")} -
                            {format(new Date(schedule.endTime), "h:mm a")}
                          </CardDescription>
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
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-muted-foreground">
                          Teacher:{" "}
                          {typeof schedule.teacherId === "string"
                            ? "Unknown"
                            : `${schedule.teacherId.firstName} ${schedule.teacherId.lastName}`}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => setSelectedSchedule(schedule)}
                              disabled={schedule.status === "cancelled" || schedule.status === "completed"}
                            >
                              Join Class
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl p-0">
                            <DialogHeader className="p-4 pb-0">
                              <DialogTitle>Live Class Session</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                              <JitsiMeetContainer
                                roomName={selectedSchedule?.meetingId || `class-${selectedSchedule?._id}`}
                                displayName={userName}
                                isTeacher={isTeacher}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
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
              <p className="text-muted-foreground mt-1">
                {isTeacher
                  ? "You don't have any classes scheduled for this date."
                  : "There are no classes scheduled for this date."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

