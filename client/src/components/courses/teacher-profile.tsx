import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Teacher } from "@/types/Teacher"
import { Mail, MapPin, Award, BookOpen } from "lucide-react"

interface TeacherProfileProps {
  teacher: Teacher
}

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const fullName = `${teacher.firstName} ${teacher.lastName}`
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-md mx-auto md:mx-0">
              <Image
                src={teacher.avartar || "/placeholder.svg?height=128&width=128"}
                alt={fullName}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold">{fullName}</h3>
              <p className="text-muted-foreground">{teacher.role}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {teacher.major.map((m, i) => (
                <Badge key={i} variant="outline" style={{ backgroundColor: m.color + "20", borderColor: m.color }}>
                  {m.name}
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{teacher.address}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{teacher.email}</span>
              </div>
              {teacher.educationLevel && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {teacher.educationLevel}, {teacher.experienceYears} năm kinh nghiệm
                  </span>
                </div>
              )}
              {teacher.publications && teacher.publications.length > 0 && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.publications.length} ấn phẩm đã xuất bản</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {teacher.publications && teacher.publications.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Ấn phẩm đã xuất bản</h4>
            <ul className="space-y-1 list-disc pl-5">
              {teacher.publications.map((pub, index) => (
                <li key={index}>{pub}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold mb-3">Giới thiệu</h4>
          <p className="text-muted-foreground">
            {fullName} là một {teacher.role.toLowerCase()} với {teacher.experienceYears} năm kinh nghiệm trong lĩnh vực
            {teacher.major.map((m) => ` ${m.name}`).join(", ")}. Với bằng cấp{" "}
            {teacher.educationLevel?.toLowerCase() || "cao"}, {teacher.firstName} đã giảng dạy cho hàng trăm học viên và
            nhận được nhiều đánh giá tích cực từ cộng đồng.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

