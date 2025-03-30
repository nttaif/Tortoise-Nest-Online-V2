import { CourseTable } from "@/components/admin/courses/courses.table"
import { getAllCourses, getListTeacher } from "@/components/common/action"
import AddCoursesButton from "@/components/admin/courses/add.courses.button"
import { Course } from "@/types/Courses";

export default async function Page() {
  const dataTeacher = await getListTeacher();
  const dataCourses = await getAllCourses() as Course[];
  return (
    <div className="container space-y-6 py-8">
      <AddCoursesButton dataTeacher={dataTeacher.results}/>
      <CourseTable teacher={dataTeacher.results} courses={dataCourses} />
    </div>
  )
}

