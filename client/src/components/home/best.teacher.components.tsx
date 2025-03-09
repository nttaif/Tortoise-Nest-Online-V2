'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"


export default function BestTeacherComponents() {
    // Danh sách giảng viên (mỗi đối tượng tượng trưng cho một giảng viên)
    const teachers = [
        { id: 1, name: "Teacher 1", animation: "animate-zoomin" },
        { id: 2, name: "Teacher 2", animation: "animate-zoomin" },
        { id: 3, name: "Teacher 3", animation: "animate-zoomin" },
        { id: 4, name: "Teacher 4", animation: "animate-zoom-out-up" },
        { id: 5, name: "Teacher 5", animation: "animate-zoom-out-up" },
        { id: 6, name: "Teacher 6", animation: "animate-zoom-out-up" },
        { id: 7, name: "Teacher 7", animation: "animate-zoomout" },
        { id: 8, name: "Teacher 8", animation: "animate-zoomout" },
        { id: 9, name: "Teacher 9", animation: "animate-zoomout" }
    ];

    // State để lưu vị trí hiện tại trong danh sách
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Thiết lập interval để cập nhật chỉ mục mỗi 3 giây
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 3) % teachers.length);
        }, 3000);

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center mb-12 mt-8 ">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-teal-500 font-medium uppercase tracking-wider mb-2"
          >
            Top teacher of month
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl mx-auto"
          >
            Best teacher of the month
          </motion.h2>
        </div>
            <div className="grid grid-cols-3 gap-8 p-4">
                {teachers.slice(currentIndex, currentIndex + 3).map((teacher) => (
                    <div
                        key={teacher.id}
                        className={`w-60 h-60 flex items-center justify-center border border-gray-300 bg-white shadow-md rounded-lg ${teacher.animation}`}
                    >
                        {teacher.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
