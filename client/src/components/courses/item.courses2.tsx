import Image from 'next/image';
import React from 'react';

export default function ItemCourses2() {
    return (
        <div className="group flex flex-wrap md:flex-nowrap max-w-4xl mx-auto rounded-xl overflow-hidden bg-white p-4 border-gray-300 border-2 shadow-lg hover:shadow-xl duration-300 text-black transition-all">

            {/* Image Section */}
            <div className="relative w-full md:w-1/3 rounded-[10px] overflow-hidden mb-3 flex justify-center">
                <Image
                    src="/images/js.png"
                    alt="JS"
                    width={250}
                    height={150}
                    className="w-full max-w-xs h-auto rounded mt-3"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 px-6">
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">

                    {/* Category */}
                    <span className="bg-gray-200 text-sm py-1 px-2 rounded-full">
                        Development
                    </span>

                    {/* Rating + Reviews */}
                    <div className="flex items-center">
                        <span className="mr-1 text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="text-gray-500 text-base">(5 Reviews)</span>
                    </div>

                    {/* Giá tiền (đẩy sang phải trên desktop) */}
                    <span className="text-blue-800 font-semibold text-lg md:ml-auto">$15.00</span>
                </div>

                {/* Course Title & Description */}
                <h2 className="font-bold text-xl mb-1 text-blue-900 text-center md:text-left">
                    Learning JavaScript With Imagination
                </h2>
                <p className="text-gray-600 mb-2 text-sm text-center md:text-left">
                    By David Millar
                </p>
                <p className="text-gray-600 mb-2 text-center md:text-left">
                    When an unknown printer took a galley of type and scrambled type specimen book it has survived not only.
                </p>

                {/* Enroll Button */}
                <div className="flex justify-center md:justify-start">
                    <button className="bg-yellow-500 text-base font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-yellow-600 transition">
                        Enroll Now
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
