import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarPlus, Clock } from "lucide-react"
import { getCourseById } from "@/data/sample.data.courses"
import { getCourseLessons } from "@/data/teacher-data"
import ScheduleCalendarView from "@/components/teacher/schedule-calendar-view"
import ScheduleCreateForm from "@/components/teacher/schedule-create-form"

// This is a Server Component
export default async function TeacherCourseSchedulePage({ params }: { params: { courseId: string } }) {
  // Server-side data fetching
  const course = await getCourseById(params.courseId)

  if (!course) {
    notFound()
  }

  // Get lessons for this course
  const lessons = await getCourseLessons(params.courseId)

  // Get all schedules for this course
  const schedules = lessons.flatMap((lesson) => lesson.scheduledTime || [])

  // Get teacher name
  const teacherName =
    typeof course.teacherId === "object" ? `${course.teacherId.firstName} ${course.teacherId.lastName}` : "Teacher"

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/teacher/courses">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to courses</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <p className="text-muted-foreground">Schedule Management</p>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="create">Create Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Course Schedule</CardTitle>
                <CardDescription>View and manage all scheduled classes for this course</CardDescription>
              </CardHeader>
              <CardContent>
                <ScheduleCalendarView schedules={schedules} courseId={params.courseId} teacherName={teacherName} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Schedule</CardTitle>
                  <CardDescription>Schedule a new class for one of the lessons in this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScheduleCreateForm lessons={lessons} courseId={params.courseId} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Lessons</CardTitle>
                  <CardDescription>Available lessons for scheduling</CardDescription>
                </CardHeader>
                <CardContent>
                  {lessons.length > 0 ? (
                    <div className="space-y-4">
                      {lessons.map((lesson) => (
                        <div key={lesson._id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <Badge variant="outline">Lesson {lesson.order}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {lesson.description || "No description provided"}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {lesson.scheduledTime?.length || 0} scheduled{" "}
                                {lesson.scheduledTime?.length === 1 ? "class" : "classes"}
                              </span>
                            </div>
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/teacher/courses/${params.courseId}/lessons/${lesson._id}/schedule`}>
                                <CalendarPlus className="h-4 w-4 mr-1" />
                                Schedule
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No lessons available for this course yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

