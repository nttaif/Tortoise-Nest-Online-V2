import { SchedulePanel } from '@/components/admin/student/schedule-panel'
import DescriptionTeacherComponents from '@/components/admin/teacher/detailsTeacher/description.teacher.components'
import DetailTeacherCompoments from '@/components/admin/teacher/detailsTeacher/detail.teacher.compoments'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-6">
  {/* Main Content */}
  <div className="w-full sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 space-y-8">
    <DetailTeacherCompoments />
    <DescriptionTeacherComponents />
  </div>

  {/* Schedule Panel */}
  <div className="w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/4 mt-6 md:mt-0">
    <SchedulePanel />
  </div>
</div>

  )
}
