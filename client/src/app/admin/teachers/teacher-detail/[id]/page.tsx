
import TeacherProfile from '@/components/admin/teacher/detailsTeacher/teacher-profile'
import { getTeacher } from '@/components/common/action'
import { teacherData } from '@/data/teacher-data'
import { Teacher } from '@/types/Teacher'
import React from 'react'
interface TeacherPageProps {
  params: {
    id: string
  }
}
export default async function page({params}:TeacherPageProps) {
  const teacher= await getTeacher(params.id) as Teacher
  console.log("Check >>>>>>>>>>>>>>>: ",teacher)
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <TeacherProfile teacher={teacher} />
      </div>
    </main>

  )
}
