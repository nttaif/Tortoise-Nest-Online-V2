"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Teacher } from "@/types/Teacher"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface TeacherInfoProps {
  teacher: Teacher
}

export function TeacherInfo({ teacher }: TeacherInfoProps) {
  const fullName = `${teacher?.firstName} ${teacher?.lastName}`
  const initials = `${teacher?.firstName.charAt(0)}${teacher?.lastName.charAt(0)}`
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarImage src={teacher?.avartar} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2 p-1">
              <p className="font-medium">{fullName}</p>
              {teacher?.educationLevel && (
                <p className="text-xs text-muted-foreground">
                  {teacher.educationLevel} • {teacher.experienceYears} năm kinh nghiệm
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-1">
                {teacher?.major.map((m, i) => (
                  <Badge key={i} variant="outline" style={{ backgroundColor: m.color + "20", borderColor: m.color }}>
                    {m.name}
                  </Badge>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{fullName}</span>
        <span className="text-xs text-muted-foreground">{teacher?.role}</span>
      </div>
    </div>
  )
}

