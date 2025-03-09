"use client"
import { motion } from "framer-motion"
import { GraduationCap, Palette, Monitor, User, PieChart, Video } from "lucide-react"

const categories = [
  {
    icon: <GraduationCap className="h-10 w-10 text-teal-500" />,
    name: "Business Management",
    color: "border-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: <Palette className="h-10 w-10 text-pink-500" />,
    name: "Arts and Design",
    color: "border-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    icon: <Monitor className="h-10 w-10 text-amber-500" />,
    name: "Computer Science",
    color: "border-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: <User className="h-10 w-10 text-teal-500" />,
    name: "Personal Development",
    color: "border-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: <PieChart className="h-10 w-10 text-purple-500" />,
    name: "Business and Finance",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: <Video className="h-10 w-10 text-blue-500" />,
    name: "Video and Photography",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
  },
]

export default function CourseCategoriesComponents() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gray-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-gray-300 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-gray-300 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-gray-300 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 border-2 border-gray-300 transform rotate-45"></div>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-teal-500 font-medium uppercase tracking-wider mb-2"
          >
            CHECKOUT OUR CATEGORIES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl mx-auto"
          >
            Top categories for popular courses to show
          </motion.h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex flex-col items-center"
            >
              <div
                className={`relative w-24 h-24 rounded-full border-2 ${category.color} ${category.bgColor} flex items-center justify-center mb-4 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-opacity-50 border-gray-300 animate-spin-slow"></div>
                {category.icon}
              </div>
              <h3 className="text-sm font-medium text-center text-gray-800">{category.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

