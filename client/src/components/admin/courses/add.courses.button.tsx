'use client'
import React from 'react'
import { AddCourseDialog } from './add-course-dialog'
import { Course } from '@/types/Courses'
import { Teacher } from '@/types/Teacher'
import { addCourses } from '@/components/common/action'

export default function AddCoursesButton({dataTeacher}:{dataTeacher:Teacher[]}) {
    const handleAddCourse = async(courseData: Partial<Course>) => {
        // Here you would typically make an API call to add the course
        const addCourse =await addCourses(courseData as Course)
        console.log(addCourse)
      }
  return (
    <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Courses</h1>
            <AddCourseDialog teachers={dataTeacher} onAddCourse={handleAddCourse} />
          </div>
  )
}
