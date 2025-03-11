import BestTeacherComponents from '@/components/home/best.teacher.components'
import CourseCategoriesComponents from '@/components/home/course-categories.components'
import EducationalLayout from '@/components/home/DiscoverMore.components'
import FreeTrialSignupComponenst from '@/components/home/free.trial.signup.components'
import HeaderAuth from '@/components/home/HeaderHome.components'
import MarqueComponents from '@/components/home/MarqueComponents'
import { PopularCourses } from '@/components/home/popular-courses'
import SlideShow from '@/components/home/slideshow.home.components'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='sticky top-0 z-50' >
      <HeaderAuth  />
      </div>
    <div className='content' >
    <SlideShow></SlideShow>
    <EducationalLayout></EducationalLayout>
    <PopularCourses />
    <MarqueComponents></MarqueComponents>
    <CourseCategoriesComponents></CourseCategoriesComponents>
    <FreeTrialSignupComponenst></FreeTrialSignupComponenst>
    <BestTeacherComponents></BestTeacherComponents>
    </div>
    <div className='Footer' >
    </div>
    </div>
  )
}
