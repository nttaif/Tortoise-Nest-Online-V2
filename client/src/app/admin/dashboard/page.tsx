import type { Metadata } from "next"
import DashboardTabs from "./component/dashboard-tabs"
import DateRangePicker from "./component/date-range-picker"
import { Suspense } from "react"
import { DashboardSkeleton } from "./component/dashboard-skeleton"

export const metadata: Metadata = {
  title: "Dashboard | Course Management System",
  description: "Analytics and reporting dashboard for course management",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container grid items-start gap-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Analytics and reporting for your courses, enrollments, and transactions
              </p>
            </div>
            <DateRangePicker />
          </div>

          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardTabs />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

