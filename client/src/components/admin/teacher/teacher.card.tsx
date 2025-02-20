"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Teacher } from "@/types/teacher"
import FormTeacherComponent from "./form.teacher"



interface TeacherCardProps {
  teacher: Teacher
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  // const getSubjectColor = (color: string) => {
  //   const colors = {
  //     green: "bg-green-100 text-green-700",
  //     orange: "bg-orange-100 text-orange-700",
  //     red: "bg-red-100 text-red-700",
  //   }
  //   return colors[color as keyof typeof colors] || colors.green
  // }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={teacher.avartar} alt={teacher.lastName} />
            <AvatarFallback>{teacher.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-[#4338ca]">{teacher.lastName}</h3>
            <p className="text-sm text-muted-foreground">{teacher.role}</p>
          </div>
        </div>
        <FormTeacherComponent
          mode="Edit"
          initialData={teacher}
          
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {teacher.major.map((major) => (
            <span
              key={major.name}
              className={`rounded-full px-3 py-1 text-xs font-medium`}
              style={{ backgroundColor: major.color }}
            >
              {major.name}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90" size="sm">
          Profile
        </Button>
        <Button className="w-full bg-[#ff7b5c] hover:bg-[#ff7b5c]/90" size="sm">
          Chat
        </Button>
      </CardFooter>
    </Card>
  )
}

