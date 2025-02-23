import Image from "next/image";
import React from "react";

export default function ItemCourses() {
    return (
        <div className="w-full max-w-80 mx-auto overflow-hidden bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-black">

            <div className=" srelative flex justify-center  overflow-hidden">
                <Image
                    src="/images/js.png"
                    alt="JS"
                    width={320}
                    height={200}
                    className=" h-auto object-cover  "
                />
            </div>

            {/* Thông tin khóa học */}
            <div className="px-4 pt-4 flex justify-between items-center flex-wrap">
                <span className="bg-gray-200 text-base py-1 px-2 rounded-full">
                    Development
                </span>

                <div className="flex items-center">
                    <span className="mr-1 text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span className="text-gray-500 text-base">(5 Reviews)</span>
                </div>
            </div>

            {/* Nội dung khóa học */}
            <div className="px-4 py-2">
                <h2 className="font-bold text-xl mb-1 text-center md:text-left">
                    Learning JavaScript With Imagination
                </h2>
                <p className="text-gray-600 mb-2 text-base text-center md:text-left">
                    By David Millar
                </p>
            </div>

            <div className="border-t border-gray-300 my-2"></div>

            {/* Giá & Nút */}
            <div className="flex justify-between items-center px-4 pb-4 flex-wrap gap-2">

                {/* Nút Enroll */}
                <button className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-blue-700 transition">
                    Enroll Now
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="border-l border-gray-300 h-8 px-5"></div>

                <span className="text-blue-800 font-semibold text-lg">$15.00</span>
            </div>


        </div>
    );
}
