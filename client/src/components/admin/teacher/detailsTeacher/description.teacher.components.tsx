import React from 'react'

export default function DescriptionTeacherComponents() {
    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden 
        p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
            <div className="text-gray-700">
                <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold text-[#303972] mb-2">
                    About
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>

                <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold text-[#303972] mt-5 mb-2">
                    Education:
                </h3>
                <ul className="space-y-3">
                    <li className="border-l-4 border-[#4d44b5] pl-3">
                        <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-medium text-gray-800">
                            History Major
                        </h6>
                        <span className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
                            2013-2017
                        </span>
                    </li>
                    <li className="border-l-4 border-[#4d44b5] pl-3">
                        <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-medium text-gray-800">
                            Master of History
                        </h6>
                        <span className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
                            2013-2017
                        </span>
                    </li>
                </ul>

                <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold text-[#303972] mt-5 mb-2">
                    Expertise:
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                    World History, Philosophy, Prehistoric...
                </p>
            </div>
        </div>
    )
}
