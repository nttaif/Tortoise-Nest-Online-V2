"use client";

import React, { useState } from "react";
import FilterSidebar from "@/components/courses/filter.sidebar";
import ItemCourses from "@/components/courses/item.courses";
import ItemCourses2 from "@/components/courses/item.courses2";

export default function AllCourses() {
    const [isGridView, setIsGridView] = useState(true);

    return (
        <div>

            <div className="relative bg-gray-100 py-4 px-8">
                <div className="relative w-full h-[250px]">
                    <img src="/images/bg.png" alt="Background Image" className=" object-cover" />

                    <img src="/images/ic1.png" alt="Icon" className="absolute top-10 left-32 w-16 h-16 animate-bounce" />
                    <img src="/images/ic2.png" alt="Icon 2" className="absolute top-2 right-4 h-[256] w-[450px]" />
                    <img src="/images/ic3.png" alt="Icon 3" className="absolute top-24 right-96 " />
                    <img src="/images/ic4.png" alt="Icon 4" className="absolute top-44 right-64 " />
                    <img src="/images/ic5.png" alt="Icon 5" className="absolute top-6 right-28 " />

                    <h1 className="absolute top-1/2 left-8 transform -translate-y-1/2 text-5xl sm:text-6xl font-bold text-black">
                        All Courses
                    </h1>

                    <div className="absolute top-[70%] left-8 font-bold flex items-center gap-2 text-gray-500 text-lg mt-4">
                        <span>Home</span>
                        <span className="text-gray-400">&gt;</span>
                        <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Courses</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 py-8">

                <div className="col-span-1">
                    <div className="hidden lg:block space-y-6">
                        <FilterSidebar />
                        <FilterSidebar />
                        <FilterSidebar />
                    </div>

                    <div className="lg:hidden">
                        <details className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300">
                            <summary className="font-semibold cursor-pointer">Filters</summary>
                            <div className="space-y-4 mt-2">
                                <FilterSidebar />
                                <FilterSidebar />
                            </div>
                        </details>
                    </div>
                </div>

                <div className="col-span-3 mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <p className="text-base text-gray-700">Showing 1-12 Of 48 Results</p>

                        <div className="flex items-center gap-2">
                            <label className="text-gray-500">Sort By:</label>
                            <select className="border px-2 py-2 rounded-md text-gray-700">
                                <option>Default Sorting</option>
                                <option>Sort By Popularity</option>
                                <option>Sort By Price</option>
                                <option>Sort By Rating</option>
                            </select>

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
                    <div className={`grid ${isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}`}>
                        {isGridView ? (
                            <>
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                                <ItemCourses />
                            </>
                        ) : (
                            <>
                                <ItemCourses2 />
                                <ItemCourses2 />
                                <ItemCourses2 />
                                <ItemCourses2 />
                                <ItemCourses2 />
                                <ItemCourses2 />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
