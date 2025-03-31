"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CalendarView from "@/components/schedule/calendar-view"
import type { LessonSchedule } from "@/types/Lesson"
import { useSession } from "next-auth/react"
import { getCourseSchedule } from "@/components/common/action"

export default function StudentSchedulePage() {
  const [schedules, setSchedules] = useState<LessonSchedule[]>([])
  const { data: session } = useSession()
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getCourseSchedule() // Gọi action để lấy dữ liệu
        setSchedules(data) // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Failed to fetch schedules:", error)
        setSchedules([]) // Xử lý lỗi: đặt schedules về mảng rỗng
      }
    }
    fetchSchedules()
  }, [])
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Class Schedule</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled classes for the coming days</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarView
              schedules={schedules}
              isTeacher={false}
              userName={`${session?.user.name}`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

