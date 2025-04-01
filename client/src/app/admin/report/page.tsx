import type { Metadata } from "next"
import { ReportGenerator } from "../dashboard/component/report-generator"

export const metadata: Metadata = {
  title: "Reports | Course Management System",
  description: "Generate and download reports for your course management system",
}
export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container grid items-start gap-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Báo cáo</h1>
              <p className="text-muted-foreground">Tạo và tải xuống báo cáo cho hệ thống quản lý khóa học</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <ReportGenerator />
          </div>
        </div>
      </div>
    </div>
  )
}

