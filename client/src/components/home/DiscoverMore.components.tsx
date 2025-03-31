"use client";
import { motion } from "framer-motion";

export default function EducationalLayout() {
  return (
    <div>
      {/* Phần bên phải: Nội dung */}
      <div >
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
