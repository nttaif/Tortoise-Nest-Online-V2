import { PaymentHistory } from "@/components/admin/student/payment-history";
import { SchedulePanel } from "@/components/admin/student/schedule-panel";
import { StudentProfile } from "@/components/admin/student/student-profile";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[1fr,400px] lg:p-6">
        <div className="space-y-6">
          <StudentProfile />
          <PaymentHistory />
        </div>
        <SchedulePanel />
      </div>
    </div>
  );
}
