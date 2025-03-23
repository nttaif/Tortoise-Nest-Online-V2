"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Paperclip } from "lucide-react"
import ButtonDesignPatten from "../DesignPattren/UI/Button"

const courses = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Data Science",
  "Business Administration",
  "Mobile App Development",
]

export default function FreeTrialSignupComponenst() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-lime-300 rounded-full opacity-70"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-300 rounded-full opacity-50"></div>

          <div className="grid md:grid-cols-2 bg-gradient-to-r from-teal-900 to-teal-400">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-12 flex flex-col justify-center relative"
            >
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-10 left-10"
              >
                <Paperclip className="h-8 w-8 text-yellow-300 transform -rotate-45" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-16 left-20"
              >
                <Paperclip className="h-6 w-6 text-pink-400 transform rotate-45" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Sign up for a <br />
                free trial lesson <br />
                by zoom
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-teal-100 mb-6"
              >
                Join our online learning platform and get access to quality education from the comfort of your home.
              </motion.p>
              
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white text-gray-800 border-none h-12 rounded-full"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white text-gray-800 border-none h-12 rounded-full"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-white text-gray-800 border-none h-12 rounded-full">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="pt-2"
                >
                  <ButtonDesignPatten
                    variant="media"  
                    text="Free Trial"
                    onClick={() => console.log("Free Trial")}
                  >
                  </ButtonDesignPatten>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

