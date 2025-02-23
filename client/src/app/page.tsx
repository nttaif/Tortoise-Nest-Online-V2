import HeaderAuth from '@/components/home/HeaderHome.components'
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
    <PopularCourses />
    </div>
    <div className='Footer' >

    </div>
    </div>
  )
}
