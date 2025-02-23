"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AnimatedImages() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Hình tròn lớn màu xanh với pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute w-[450px] h-[450px] rounded-full z-0"
        style={{
          backgroundColor: "#20B2AA",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "15px 15px",
        }}
      />

      {/* Hình tròn cam (phía trên) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute w-[100px] h-[100px] rounded-full z-20"
        style={{
          backgroundColor: "#FF8C00",
          top: "15%",
          right: "25%",
        }}
      >
        {/* Accent circle */}
        <div
          className="absolute w-[30px] h-[30px] rounded-full"
          style={{
            background: "linear-gradient(135deg, #fff 50%, #20B2AA 50%)",
            top: "15%",
            left: "15%",
          }}
        />
      </motion.div>

      {/* Hình tròn hồng (phía dưới) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute w-[150px] h-[150px] rounded-full z-10"
        style={{
          backgroundColor: "#FF6B7A",
          bottom: "20%",
          left: "20%",
        }}
      />

      {/* Hình nhân vật */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-30"
      >
        <Image
          src="/images/character-main-home.png"
          alt="Woman with laptop"
          width={500}
          height={600}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  )
}

