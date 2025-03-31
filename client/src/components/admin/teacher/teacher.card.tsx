// "use client"

// import { MoreVertical } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Teacher } from "@/types/Teacher"
// import FormTeacherComponent from "./form.teacher"



// interface TeacherCardProps {
//   teacher: Teacher
// }

// export function TeacherCard({ teacher }: TeacherCardProps) {
//   // const getSubjectColor = (color: string) => {
//   //   const colors = {
//   //     green: "bg-green-100 text-green-700",
//   //     orange: "bg-orange-100 text-orange-700",
//   //     red: "bg-red-100 text-red-700",
//   //   }
//   //   return colors[color as keyof typeof colors] || colors.green
//   // }
//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <div className="flex items-center space-x-4">
//           <Avatar className="h-12 w-12">
//             <AvatarImage src={teacher.avartar} alt={teacher.lastName} />
//             <AvatarFallback>{teacher.lastName[0]}</AvatarFallback>
//           </Avatar>
//           <div>
//             <h3 className="font-semibold text-[#4338ca]">{teacher.lastName}</h3>
//             <p className="text-sm text-muted-foreground">{teacher.role}</p>
//           </div>
//         </div>
//         <FormTeacherComponent
//           mode="Edit"
//           initialData={teacher}
          
//         />
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-wrap gap-2">
//           {teacher.major.map((major) => (
//             <span
//               key={major.name}
//               className={`rounded-full px-3 py-1 text-xs font-medium`}
//               style={{ backgroundColor: major.color }}
//             >
//               {major.name}
//             </span>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter className="grid grid-cols-2 gap-4">
//         <Button className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90" size="sm">
//           Profile
//         </Button>
//         <Button className="w-full bg-[#ff7b5c] hover:bg-[#ff7b5c]/90" size="sm">
//           Chat
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }
"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Teacher } from "@/types/Teacher"
import FormTeacherComponent from "./form.teacher"
import { useRouter } from "next/navigation"

interface TeacherCardProps {
  teacher: Teacher
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const router= useRouter()
  return (
    <Card className="overflow-hidden p-4 max-w-sm">
      <div className=" right-4 top-4">
      <FormTeacherComponent
          mode="Edit"
          initialData={teacher}
        />
      </div>

      <div className="flex flex-col items-center text-center space-y-3 pt-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={teacher.avartar} alt={teacher.lastName}/>
          <AvatarFallback>{teacher.lastName[0]}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-[#1E2875]">{teacher.lastName}</h3>
          <p className="text-sm text-muted-foreground">Teacher</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {teacher.major.map((major) => (
            <span
              key={major.name}
              className="rounded-full px-4 py-1 text-xs font-semibold"
              style={{
                backgroundColor:
                  major.name === "Mathematics"? major.color
                    : major.name === "Computer Science"? major.color
                      : major.name === "Chemistry"? major.color
                        : major.name === "Physics"? major.color
                        : major.name === "Biology"? major.color
                        : major.name === "Engineering"? major.color
                        : major.name === "Economics"? major.color
                        : major.name === "Business Administration"? major.color
                        :major.color,

                color:
                  major.name === "Mathematics"? "#1EBA62"
                    : major.name === "Computer Science"? "#FB7D5B"
                      : major.name === "Chemistry"? "#fd5353"
                        : major.name ==="Physics"? "#3554e3"
                        : major.name ==="Biology"? "#1284d9"
                        : major.name ==="Engineering"? "#9d19ff"
                        : major.name ==="Economics"? "#e98c09"
                        : major.name ==="Business Administration"? "#00c774"
                        :"ffffff"
                        ,
              }}
            >
              {major.name}
            </span>
          ))}
        </div>
      </div>

      <CardFooter className="grid grid-cols-2 gap-4 mt-6">
        <Button className="w-full bg-[#4D44B5] hover:bg-[#413a9a]/90 text-white" size="lg"onClick={() => router.push(`/admin/teachers/teacher-detail/${teacher._id}`)}>
          Profile
        </Button>
        <Button className="border-[#ebebf9] w-full bg-[#ebebf9] hover:bg-[#c8c8d4]/90 text-[#303972]" size="lg">
          Chat
        </Button>
      </CardFooter>
    </Card>
  )
}


