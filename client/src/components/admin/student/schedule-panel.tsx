import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CalendarIcon, ClockIcon } from "lucide-react"

const schedules = [
  {
    title: "Basic Algorithm",
    category: "Algorithm",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/images/avatar.png",
    color: "border-primary",
  },
  {
    title: "Basic Art",
    category: "Art",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/images/avatar.png",
    color: "border-orange-500",
  },
  {
    title: "React & Scss",
    category: "Programming",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/images/avatar.png",
    color: "border-yellow-500",
  },
  {
    title: "Simple Past Tense",
    category: "English",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/images/avatar.png",
    color: "border-primary",
  },
]
export function SchedulePanel() {
  return (
    <div className="space-y-6 mx-4 sm:mx-8">
  <Card>
    <CardHeader>
      <CardTitle className="font-bold text-[#303972]">Schedule Courses</CardTitle>
      <p className="text-sm text-muted-foreground">Thursday, 10th April, 2022</p>
    </CardHeader>
  </Card>
  {schedules.map((schedule, index) => (
    <Card
      key={index}
      className={`border-l-[6px] ${schedule.color} border-t-0 border-r-0 border-b-0 shadow-md rounded-lg`}
    >
      <CardContent className="p-4 sm:p-6">
        <div>
          <h4 className="mb-1 text-lg font-semibold">{schedule.title}</h4>
          <p className="text-sm text-muted-foreground">{schedule.category}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-4">
          <div>
            <ul>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-5 h-5 text-orange-500" />
                {schedule.date}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <ClockIcon className="w-5 h-5 text-yellow-500" />
                {schedule.time}
              </li>
            </ul>
          </div>

          {/* Ảnh giảng viên */}
          <Image
            src={schedule.instructor || "/placeholder.svg"}
            alt="Instructor"
            width={56}
            height={56}
            className="rounded-full mt-4 sm:mt-0"
          />
        </div>
      </CardContent>
    </Card>
  ))}

  <Button
    variant="secondary"
    className="w-full bg-gray-100 hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
  >
    View More
  </Button>
</div>

  )
}

