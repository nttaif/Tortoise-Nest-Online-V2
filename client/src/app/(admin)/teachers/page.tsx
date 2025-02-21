import { Pagination } from "@/components/ui/Pagination.seachParams";
import { SearchHeader } from "@/components/admin/teacher/seach.header";
import { TeacherGrid } from "@/components/admin/teacher/teacher.grid";
import { getListTeacher } from "@/components/common/action";
interface TeacherPageProps {
  searchParams: {
    current?: string
  }
}
// src/app/users/page.tsx
const TeacherPage = async({ searchParams }: TeacherPageProps) => {
   // Default to page 1 and pageSize 10 if not provided in searchParams
   const current = Number(searchParams?.current) || 1
   const pageSize = 12

    const listTeacher = await getListTeacher(current,pageSize);
    return (
      <main className="min-h-screen p-4 md:p-8">
      <SearchHeader/>
      <TeacherGrid listTeacher={listTeacher}/>
      <div className="flex justify-center pt-4">
        <Pagination currentPage={current} pageSize={pageSize} totalItems={listTeacher.meta.total || 0} />
      </div>
    </main>
    );
  };
  
  export default TeacherPage;
  