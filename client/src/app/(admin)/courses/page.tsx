import { CourseTable } from "@/components/admin/courses/courses.table"
import { sampleCourses, sampleTeachers } from "@/data/sample.data.courses"
import { getAllCourses, getListTeacher } from "@/components/common/action"
import AddCoursesButton from "@/components/admin/courses/add.courses.button"

export default async function Page() {
  const dataTeacher = await getListTeacher();
  const dataCourses = await getAllCourses();
  return (
    <div className="container space-y-6 py-8">
      <AddCoursesButton dataTeacher={dataTeacher.results}/>
      <CourseTable teacher={dataTeacher.results} courses={dataCourses || sampleCourses} />
    </div>
  )
}

