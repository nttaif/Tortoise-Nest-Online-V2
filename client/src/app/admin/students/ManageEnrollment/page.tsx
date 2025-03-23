import { Suspense } from "react"
import EnrollmentDashboard from "@/components/admin/enrollment/enrollment-dashboard"
import { EnrollmentSkeleton } from "@/components/admin/enrollment/enrollment-skeleton"
import { getEnrollments } from "@/components/common/action"
import { IEnrollment } from "@/types/IEnrollment"

export default async function EnrollmentsPage() {
  const enrollments = await getEnrollments() as IEnrollment[]
  
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Student Enrollment Management</h1>
      <Suspense fallback={<EnrollmentSkeleton />}>
        
        <EnrollmentDashboard initialIEnrollment={enrollments}/>
      </Suspense>
    </main>
  )
}

