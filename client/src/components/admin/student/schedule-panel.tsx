import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const schedules = [
  {
    title: "Basic Algorithm",
    category: "Algorithm",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/placeholder.svg?height=32&width=32",
    color: "border-primary",
  },
  {
    title: "Basic Art",
    category: "Art",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/placeholder.svg?height=32&width=32",
    color: "border-orange-500",
  },
  {
    title: "React & Scss",
    category: "Programming",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/placeholder.svg?height=32&width=32",
    color: "border-yellow-500",
  },
  {
    title: "Simple Past Tense",
    category: "English",
    date: "July 20, 2023",
    time: "09:00 - 10:00 AM",
    instructor: "/placeholder.svg?height=32&width=32",
    color: "border-primary",
  },
]

export function SchedulePanel() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Details</CardTitle>
          <p className="text-sm text-muted-foreground">Thursday, 10th April, 2022</p>
        </CardHeader>
      </Card>

      {schedules.map((schedule, index) => (
        <Card key={index} className={`border-l-4 ${schedule.color}`}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{schedule.title}</h3>
              <p className="text-sm text-muted-foreground">{schedule.category}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{schedule.date}</span>
                <span>•</span>
                <span>{schedule.time}</span>
              </div>
            </div>
            <Image
              src={schedule.instructor || "/placeholder.svg"}
              alt="Instructor"
              width={32}
              height={32}
              className="rounded-full"
            />
          </CardContent>
        </Card>
      ))}

      <Button variant="secondary" className="w-full bg-gray-100 hover:bg-primary hover:text-white transition-colors">
        View More
      </Button>
    </div>
  )
}

