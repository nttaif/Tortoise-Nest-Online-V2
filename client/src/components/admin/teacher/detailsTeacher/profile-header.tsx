"use client"

import type { Teacher } from "@/types/Teacher"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Mail, MapPin, Award } from "lucide-react"

interface ProfileHeaderProps {
  teacher: Teacher
}

export default function ProfileHeader({ teacher }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Background header */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-16 items-start md:items-end">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
              <img
                src={teacher.avartar || "/placeholder.svg"}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1633660734/avatars/avt1.png"
                }}
              />
            </div>
            <div
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full ${teacher.isActive ? "bg-green-500" : "bg-gray-400"} border-2 border-white`}
            ></div>
          </motion.div>

          {/* Teacher info */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {teacher.firstName} {teacher.lastName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-2"
            >
              {teacher.major.map((major, index) => (
                <Badge
                  key={index}
                  style={{ backgroundColor: major.color, color: "#333" }}
                  className="font-medium transition-all hover:scale-105"
                >
                  {major.name}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300"
            >
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{teacher.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={16} />
                <span>{teacher.role}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

