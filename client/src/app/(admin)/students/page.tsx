import { StudentTable } from "@/components/admin/student/student-table";
import { TableHeader } from "@/components/admin/student/table-header";
import { Footer } from "@/components/admin/student/footer";

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="container mx-auto p-4 space-y-4">
        <TableHeader />
        <StudentTable />
      </main>
      <Footer />
    </div>
  )
}

