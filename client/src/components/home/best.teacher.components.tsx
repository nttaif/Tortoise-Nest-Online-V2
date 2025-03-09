'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Teacher } from "@/types/Teacher";
import { getCourses } from "@/lib/courses";
import ProfileCard from "../aboutus/profilecard.component";

export default function BestTeacherComponents() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        async function fetchTeachers() {
            const { courses } = await getCourses();
            const teacherMap = new Map();
            courses.forEach((course) => {
                if (course.teacherId && !teacherMap.has(course.teacherId._id)) {
                    teacherMap.set(course.teacherId._id, course.teacherId);
                }
            });
            setTeachers(Array.from(teacherMap.values()));
        }
        fetchTeachers();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 3) % teachers.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [teachers]);

    return (    
        <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center mb-12 mt-8 ">
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-teal-500 font-medium uppercase tracking-wider mb-2 "
            >
                Qualified teachers
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl mx-auto"
            >
                Meet the teacher who teaches you online
            </motion.h2>
        </div>
        <div className="grid grid-cols-3 gap-8 p-4">
            {teachers.slice(currentIndex, currentIndex + 3).map((teacher) => (
                <ProfileCard
                    key={teacher._id}
                    name={`${teacher.firstName} ${teacher.lastName}`}
                    role={teacher.role}
                    image={teacher.avartar}
                />
            ))}
        </div>
    </div>
    );
}
