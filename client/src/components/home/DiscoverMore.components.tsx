"use client";
import { motion } from "framer-motion";

export default function EducationalLayout() {
  return (
    <div className="container mx-auto py-16 px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
      {/* Phần bên trái: Hình ảnh với hiệu ứng */}
      <div className="relative max-w-2xl mx-auto lg:w-1/2">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#000" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Hình ảnh chính */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 rounded-3xl overflow-hidden shadow-xl"
          style={{ maxWidth: "550px" }}
        >
          <img src="/images/student-2.jpg" alt="Student with notebook" className="w-full h-auto rounded-3xl" />
        </motion.div>
          </div>

      {/* Phần bên phải: Nội dung */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h4 className="text-teal-500 font-semibold uppercase text-lg lg:text-xl">Get to Know Us</h4>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 leading-snug">
          Grow your skills <br /> learn with us from anywhere
        </h2>
        <p className="text-gray-600 mt-5 text-lg lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Danh sách icon */}
        <div className="grid grid-cols-2 gap-6 mt-6 text-lg lg:text-xl">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-red-500 text-white flex items-center justify-center rounded-full text-lg">✔</span>
            <p className="text-gray-800 font-medium">Expert trainers</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-purple-500 text-white flex items-center justify-center rounded-full text-lg">✔</span>
            <p className="text-gray-800 font-medium">Online learning</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center rounded-full text-lg">✔</span>
            <p className="text-gray-800 font-medium">Lifetime access</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-teal-500 text-white flex items-center justify-center rounded-full text-lg">✔</span>
            <p className="text-gray-800 font-medium">Great results</p>
          </div>
        </div>
        {/* Nút bấm Discover More */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-black text-white px-8 py-4 rounded-full text-lg lg:text-xl font-semibold hover:bg-gray-800 transition duration-300"
        >
          Discover More
        </motion.button>
      </div>
    </div>
  );
}
