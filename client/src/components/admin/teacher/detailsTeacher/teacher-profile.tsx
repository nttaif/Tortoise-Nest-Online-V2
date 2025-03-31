"use client"

import { useState } from "react"
import type { Teacher } from "@/types/Teacher"
import ProfileHeader from "./profile-header"
import ProfileDetails from "./profile-details"
import CoursesList from "./courses-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface TeacherProfileProps {
  teacher: Teacher
}

export default function TeacherProfile({ teacher }: TeacherProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
    >
      <ProfileHeader teacher={teacher} />

      <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-none">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="courses">Courses ({teacher.courses?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="p-6">
          <ProfileDetails teacher={teacher} />
        </TabsContent>

        <TabsContent value="courses" className="p-6">
          <CoursesList courses={teacher.courses || []} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

