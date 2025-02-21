import { SearchHeader } from "@/components/admin/teacher/seach.header";
import { TeacherGrid } from "@/components/admin/teacher/teacher.grid";
import { getListTeacher } from "@/components/common/action";

// src/app/users/page.tsx
const TeacherPage = async() => {
    const listTeacher = await getListTeacher();
    return (
      <main className="min-h-screen p-4 md:p-8">
      <SearchHeader listTeacher={listTeacher}/>
      <TeacherGrid listTeacher={listTeacher}/>
    </main>
    );
  };
  
  export default TeacherPage;
  