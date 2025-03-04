"use client"
import React from "react"
import { motion } from "framer-motion"

export default function ClientSideAnimations({ children }: { children: React.ReactNode }) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {child}
        </motion.div>
      ))}
    </>
  )
}

