import { PaymentHistory } from "@/components/admin/student/payment-history";
import { SchedulePanel } from "@/components/admin/student/schedule-panel";
import { StudentProfile } from "@/components/admin/student/student-profile";
import { Header } from "@/components/admin/student/header";
import { Footer } from "@/components/admin/student/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
    <div className="border-b bg-white px-6 py-3">
      <h1 className="text-lg font-semibold text-primary">Student Detail</h1>
    </div>
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[1fr,400px] lg:p-6">
      <div className="space-y-6">
        <StudentProfile />
        <PaymentHistory />
      </div>
      <SchedulePanel />
    </div>
    <Footer />
  </div>
)
}
