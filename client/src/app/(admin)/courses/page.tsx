import { CourseTable } from "@/components/admin/courses/courses.table"
import { sampleCourses, sampleTeachers } from "@/data/sample.data.courses"
import { getAllCourses, getListTeacher } from "@/components/common/action"
import { AddCourseDialog } from "@/components/admin/courses/add-course-dialog"
import { Course } from "@/types/Courses"
import AddCoursesButton from "@/components/admin/courses/add.courses.button"

export default async function Page() {
  const dataTeacher = await getListTeacher();
  const dataCourses = await getAllCourses();
  return (
    <div className="container space-y-6 py-8">
      <AddCoursesButton dataTeacher={dataTeacher.results}/>
      <CourseTable courses={dataCourses || sampleCourses} />
    </div>
  )
}

