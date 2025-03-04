import CourseCategoriesComponents from '@/components/home/course-categories.components'
import DiscoverMoreComponents from '@/components/home/DiscoverMore.components'
import FreeTrialSignupComponenst from '@/components/home/free.trial.signup.components'
import HeaderAuth from '@/components/home/HeaderHome.components'
import MarqueComponents from '@/components/home/MarqueComponents'
import { PopularCourses } from '@/components/home/popular-courses'
import SlideShow from '@/components/home/slideshow.home.components'
import React from 'react'

export default function page() {
  return (
    <div>
      <div>
      <HeaderAuth></HeaderAuth>
      </div>
    <div className='content' >
      
    <SlideShow></SlideShow>
    <DiscoverMoreComponents></DiscoverMoreComponents>
    <PopularCourses />
    <MarqueComponents></MarqueComponents>
    <CourseCategoriesComponents></CourseCategoriesComponents>
    <FreeTrialSignupComponenst></FreeTrialSignupComponenst>
    </div>
    <div className='Footer' >
    </div>
    </div>
  )
}
