"use client";

import React, { useState } from "react";
import ItemCourses from "@/components/courses/item.courses";
import ItemCourses2 from "@/components/courses/item.courses2";

export default function CoursesPage() {
  const [isGridView, setIsGridView] = useState(true);

  const [courses, setCourses] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  // Sắp xếp giảm dần
  const handleDescending = () => {
    setCourses([...courses].sort((a, b) => b - a));
  };

  // Xáo trộn ngẫu nhiên
  const handleShuffle = () => {
    setCourses([...courses].sort(() => Math.random() - 0.5));
  };

  // Xoay danh sách (phần tử đầu xuống cuối)
  const handleRotate = () => {
    setCourses([...courses.slice(1), courses[0]]);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex border-gray-300 flex-col sm:flex-row justify-between ">

        <div className="flex justify-start gap-2 text-sm text-gray-600 ">

          <button onClick={handleDescending}
            className="bg-gray-100 hover:bg-gray-400  font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition "
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            Descending
          </button>

          <button onClick={handleShuffle}
            className="bg-gray-100 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>


            Shuffle
          </button>
          <button onClick={handleRotate}
            className="bg-gray-100 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
            Rotate
          </button>
        </div>

        <div className="flex items-center gap-2">

          <button
            className={`p-2 border rounded-md hover:bg-gray-100 text-blue-700 ${isGridView ? "bg-blue-200" : ""
              }`}
            onClick={() => setIsGridView(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
          <button
            className={`p-2 border rounded-md hover:bg-gray-100 text-blue-700 ${!isGridView ? "bg-blue-200" : ""
              }`}
            onClick={() => setIsGridView(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Danh sách khóa học */}
      <div
        className={`grid ${isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" : "flex flex-col gap-4"
          }`}
      >
        {courses.map((course, index) =>
          isGridView ? <ItemCourses key={index} /> : <ItemCourses2 key={index} />
        )}
      </div>


    </div>
  );
};

