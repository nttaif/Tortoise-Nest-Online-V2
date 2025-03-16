"use client"

import type { Teacher } from "@/types/Teacher"
import { motion } from "framer-motion"
import { BookOpen, Calendar, Award, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileDetailsProps {
  teacher: Teacher
}

export default function ProfileDetails({ teacher }: ProfileDetailsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-500" />
              Education & Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Education Level</p>
                  <p className="font-medium">{teacher.educationLevel || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Years of Experience</p>
                  <p className="font-medium">{teacher.experienceYears || 0} years</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {teacher.publications && teacher.publications.length > 0 && (
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {teacher.publications.map((publication, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {publication}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {teacher.major.map((major, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: major.color }}
                  className="px-4 py-2 rounded-lg text-gray-800 font-medium transition-transform hover:scale-105"
                >
                  {major.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

