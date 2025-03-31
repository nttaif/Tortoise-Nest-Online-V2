import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Edit, Eye, Plus, Users } from "lucide-react"
import { getTeacherCourses } from "@/data/teacher-data"
import TeacherCourseActions from "@/components/teacher/teacher-course-actions"

// This is a Server Component
export default async function TeacherCoursesPage() {
  // In a real app, you would get the teacher ID from the session
  const teacherId = "teacher1"

  // Server-side data fetching
  const { activeCourses, draftCourses } = await getTeacherCourses(teacherId)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and schedules</p>
        </div>
        <Button asChild>
          <Link href="/teacher/courses/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Course
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
          <TabsTrigger value="active">Active Courses ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {activeCourses.map((course) => (
                <TeacherCourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <h3 className="text-xl font-medium mb-2">No active courses</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You don't have any active courses yet. Create a new course to get started.
                </p>
                <Button asChild>
                  <Link href="/teacher/courses/new">
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          {draftCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {draftCourses.map((course) => (
                <TeacherCourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <h3 className="text-xl font-medium mb-2">No draft courses</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You don't have any draft courses. Create a new course to get started.
                </p>
                <Button asChild>
                  <Link href="/teacher/courses/new">
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Server Component for Course Card
function TeacherCourseCard({ course }: { course: any }) {
  const enrollmentCount = course.enrollmentCount || 0
  const lessonsCount = course.lessons?.length || 0
  const schedulesCount = course.schedulesCount || 0

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <div className="aspect-video relative overflow-hidden rounded-l-lg h-full">
              <img
                src={course.image || "/placeholder.svg?height=225&width=400"}
                alt={course.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="md:col-span-3 p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{course.name}</h2>
                  <Badge variant={course.status ? "default" : "secondary"}>
                    {course.status ? "Published" : "Draft"}
                  </Badge>
                </div>
                <TeacherCourseActions courseId={course._id} />
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {enrollmentCount} {enrollmentCount === 1 ? "student" : "students"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {schedulesCount} {schedulesCount === 1 ? "schedule" : "schedules"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/teacher/courses/${course._id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Course
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/courses/${course._id}`}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/teacher/courses/${course._id}/schedule`}>
                    <CalendarClock className="mr-2 h-4 w-4" /> Manage Schedules
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

