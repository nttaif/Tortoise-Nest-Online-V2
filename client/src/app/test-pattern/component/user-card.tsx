import type { User } from "../types/user"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { createUserDisplayFactory } from "../patterns/abstract-factory"
import { ActiveStatusDecorator, ExperienceDecorator } from "../patterns/decorator"
import { Badge } from "@/components/ui/badge"
import { Clock, Award, CheckCircle } from "lucide-react"
import Image from "next/image"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  // Use Abstract Factory to create the appropriate display
  const factory = createUserDisplayFactory(user)
  let userDisplay = factory.createUserDisplay()

  // Apply decorators
  userDisplay = new ActiveStatusDecorator(userDisplay)

  // Apply experience decorator only for teachers
  if (user.role === "teacher") {
    userDisplay = new ExperienceDecorator(userDisplay)
  }

  // Get the display data
  const displayData = userDisplay.displayUser(user)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 w-full bg-gradient-to-r from-primary/20 to-primary/40">
          <div className="absolute -bottom-12 left-6">
            <div className="rounded-full border-4 border-background overflow-hidden">
              <Image
                src={user.avartar || `/placeholder.svg?height=96&width=96`}
                alt={displayData.basicInfo.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-16 pb-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{displayData.basicInfo.name}</h3>
          <p className="text-muted-foreground capitalize">{user.role}</p>
        </div>

        {/* Render user information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Email:</span>
            <span>{displayData.basicInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Địa chỉ:</span>
            <span>{displayData.basicInfo.address}</span>
          </div>

          {/* Teacher specific information */}
          {displayData.teacherInfo && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Trình độ học vấn:</span>
                <span>{displayData.teacherInfo.educationLevel || "Chưa cập nhật"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Năm kinh nghiệm:</span>
                <span>{displayData.teacherInfo.experienceYears || 0}</span>
              </div>
              <div className="space-y-1">
                <span className="font-semibold">Chuyên ngành:</span>
                <div className="flex flex-wrap gap-2">
                  {displayData.teacherInfo.major.map((m, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: m.color, color: "#fff" }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
              {displayData.teacherInfo.publications && displayData.teacherInfo.publications.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold">Ấn phẩm:</span>
                  <ul className="list-disc list-inside">
                    {displayData.teacherInfo.publications.map((pub, index) => (
                      <li key={index}>{pub}</li>
                    ))}
                  </ul>
                </div>
              )}
              {displayData.teacherInfo.courses && displayData.teacherInfo.courses.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold">Khóa học:</span>
                  <ul className="list-disc list-inside">
                    {displayData.teacherInfo.courses.map((course) => (
                      <li key={course._id}>
                        {course.name} - {course.price.toLocaleString("vi-VN")}đ
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Status badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={displayData.status.isActive ? "success" : "destructive"}>
            {displayData.status.isActive ? (
              <CheckCircle className="w-4 h-4 mr-1" />
            ) : (
              <Clock className="w-4 h-4 mr-1" />
            )}
            {displayData.status.isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Badge>

          {displayData.status.isExperienced && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
              <Award className="w-4 h-4 mr-1" />
              Giảng viên kinh nghiệm
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

