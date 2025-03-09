'use client'
import React from 'react'
import { AddCourseDialog } from './add-course-dialog'
import { Course } from '@/types/Courses'
import { Teacher } from '@/types/Teacher'
import { addCourses, UploadImage } from '@/components/common/action'
import { base64ToFile } from '@/lib/utils'
import { toast } from 'sonner'

export default function AddCoursesButton({dataTeacher}:{dataTeacher:Teacher[]}) {
    const handleAddCourse = async(courseData: Partial<Course>) => {
      let file: File | null = null;
      if (typeof courseData.image === "string" && courseData.image.startsWith("data:image")) {
        file = base64ToFile(courseData.image, "course_image.jpg");
      } else{
        toast.error('Error upload images',{description:'Upload failed, Please try again'})
        return
      }
      if (!file) {
        toast.error('Error upload images',{description:'Please chosse image valid!'})
        return;
      }
      const uploadUrl = await UploadImage(file);
      courseData.image=uploadUrl as string;
      const addCourse =await addCourses(courseData as Course)
      if(!addCourse){
        toast.error('Error add student:', {description:courseData.image})
      }else{
        toast.success('Success',{description:'Upload teacher is success, Please reload page!'})
      }
      }
  return (
    <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Courses</h1>
            <AddCourseDialog teachers={dataTeacher} onAddCourse={handleAddCourse} />
          </div>
  )
}
