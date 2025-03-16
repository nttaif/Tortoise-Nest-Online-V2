import { getEnrollments } from "@/components/common/action"
import EnrollmentFilters from "./enrollment-filters"
import EnrollmentTable from "./enrollment-table"
import MobileEnrollmentList from "./mobile-enrollment-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IEnrollment } from "@/types/IEnrollment"

interface EnrollmentDashboardProps {
  initialIEnrollment: IEnrollment[]
}

// Server Component
export default async function EnrollmentDashboard({ initialIEnrollment }: EnrollmentDashboardProps) {
  // Fetch enrollments data on the server
  return (
    <div className="space-y-4">
      <EnrollmentFilters />
      {/* Desktop view (table) and Mobile view (cards) with tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {/* Desktop view */}
          <div className="hidden md:block">
            <EnrollmentTable enrollments={initialIEnrollment} />
          </div>
          {/* Mobile view */}
          <div className="md:hidden">
            <MobileEnrollmentList enrollments={initialIEnrollment} />
          </div>
        </TabsContent>
        <TabsContent value="active">
          {/* Desktop view */}
          <div className="hidden md:block">
            <EnrollmentTable enrollments={initialIEnrollment.filter((e) => e.enrollmentStatus === "active")} />
          </div>
          {/* Mobile view */}
          <div className="md:hidden">
            <MobileEnrollmentList enrollments={initialIEnrollment.filter((e) => e.enrollmentStatus === "active")} />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          {/* Desktop view */}
          <div className="hidden md:block">
            <EnrollmentTable enrollments={initialIEnrollment.filter((e) => e.enrollmentStatus === "pending")} />
          </div>
          {/* Mobile view */}
          <div className="md:hidden">
            <MobileEnrollmentList enrollments={initialIEnrollment.filter((e) => e.enrollmentStatus === "pending")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

