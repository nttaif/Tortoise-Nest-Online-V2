"use client"

import type { Course } from "@/types/Courses"
import { motion } from "framer-motion"
import CourseCard from "./course-card"

interface CoursesListProps {
  courses: Course[]
}

export default function CoursesList({ courses }: CoursesListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </motion.div>
  )
}

