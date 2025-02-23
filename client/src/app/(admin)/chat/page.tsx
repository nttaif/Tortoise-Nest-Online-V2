"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Chat() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
            {/* Sidebar */}
            <div className="shadow-lg w-full mx-auto overflow-hidden col-span-1 bg-white p-6 space-y-6 max-h-[990px] overflow-y-auto">
                {/* Search Bar */}
                <div className="flex items-center w-full space-x-2">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="bg-gray-100 outline-none w-full p-3 pl-10 rounded-lg border border-gray-300"
                        />
                    </div>
                    <button className="bg-blue-600 text-white p-3 rounded-lg font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>

                {/* Contacts */}
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Contacts</h2>
                        <h2 className="text-xl text-blue-600 cursor-pointer">View All</h2>
                    </div>

                    {/* Avatars */}
                    <div className="flex space-x-2 mt-4">
                        {["taihocbai.jpg", "LongNguyen.jpg", "avatar.png", "TruongVu.png", "NhanPhan.png", "HoangVi.png", "DuyMinh.png"].map((src, index) => (
                            <img
                                key={index}
                                className="w-16 h-16 rounded-full border-2 border-white object-cover"
                                src={`/images/${src}`}
                                alt="avatar"
                            />
                        ))}
                    </div>
                </div>



                {/* Groups */}
                <div className="w-full mt-6">
                    <h2 className="text-2xl font-semibold">Groups</h2>
                    <div className="mt-4 space-y-2">
                        {[
                            { name: "Team này mạnh (32)", time: "10:12 PM", img: "team.png", message: "Mai đi cà phê học bài", active: true },
                            { name: "Mẫu thiết kế phần mềm", time: "10:20 PM", img: "cover.png", message: "Tuần sau nộp báo cáo" },
                            { name: "Thương mại điện tử", time: "10:50 PM", img: "JS.png", message: "Làm đồ án chưa?" },
                        ].map((group, index) => (
                            <div
                                key={index}
                                className={`flex text-xl items-center p-3 rounded-lg cursor-pointer  ${group.active ? "bg-gray-50" : "hover:bg-gray-100"
                                    }`}
                            >
                                <img
                                    className="w-16 h-16 rounded-full object-cover mr-3"
                                    src={`/images/${group.img}`}
                                    alt="group avatar"
                                />

                                {/* Group Info */}
                                <div className="flex-1">
                                    <span className="font-semibold">{group.name}</span>
                                    <p className="text-gray-500 text-base truncate">{group.message}</p>
                                </div>

                                {/* Time */}
                                <span className="text-gray-400 text-sm">{group.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chats */}
                <div className="w-full mt-6">
                    <h2 className="text-2xl font-semibold">Chats</h2>
                    <div className="mt-4 space-y-2">
                        {[
                            { name: "Ngo Thanh Tai", time: "10:12 PM", img: "taihocbai.jpg", message: "Hello" },
                            { name: "Long Nguyen", time: "10:20 PM", img: "LongNguyen.jpg", message: "Hello" },
                            { name: "Quynh Ngo", time: "10:50 PM", img: "avatar.png", message: "Hello" },
                            { name: "Truong Vu", time: "10:20 PM", img: "TruongVu.png", message: "Hello" },
                            { name: "Nhan Phan", time: "10:20 PM", img: "NhanPhan.png", message: "Hello" },
                            { name: "Hoang Vi", time: "10:20 PM", img: "HoangVi.png", message: "Hello" },
                            { name: "Duy Minh", time: "10:20 PM", img: "DuyMinh.png", message: "Hello" },

                        ].map((group, index) => (
                            <div
                                key={index}
                                className={`flex text-xl items-center p-3 rounded-lg cursor-pointer   "bg-purple-100" : "hover:bg-gray-100"
                                    }`}
                            >
                                <img
                                    className="w-16 h-16 rounded-full object-cover mr-3"
                                    src={`/images/${group.img}`}
                                    alt="group avatar"
                                />

                                {/* Group Info */}
                                <div className="flex-1">
                                    <span className="font-semibold">{group.name}</span>
                                    <p className="text-gray-500 text-base truncate">{group.message}</p>
                                </div>

                                {/* Time */}
                                <span className="text-gray-400 text-sm">{group.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-50 text-blue-900 text-xl font-semibold py-2 px-4 rounded-full hover:bg-blue-300 border w-96">
                        View more
                    </button>
                </div>
            </div>

            {/* Chat Box */}
            <div className="col-span-2 shadow-lg rounded-md w-full h-screen mx-auto flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                        <img src="/images/team.png" alt="User" className="w-16 h-16 rounded-full" />
                        <div>
                            <h2 className="text-xl font-semibold">Team này mạnh</h2>
                            <span className="text-green-500 text-sm">● Online</span>
                        </div>
                    </div>
                    <div className="flex space-x-4 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>


                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[calc(0vh-100px)] scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">                    <div className="flex items-start space-x-3">
                    <img src="/images/avatar.png" alt="Quynh Ngo" className="w-10 h-10 rounded-full" />
                    <div>
                        <h3 className="font-semibold">Quynh Ngo</h3>
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                            Hello
                        </div>
                        <span className="text-xs text-gray-500">10:12 PM</span>
                    </div>
                </div>
                    <div className="flex items-start space-x-3">
                        <img src="/images/taihocbai.jpg" alt="Tai" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Ngo Thanh Tai</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-500">10:14 PM</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <img src="/images/TruongVu.png" alt="Vu" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Truong Vu</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-500">10:14 PM</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <img src="/images/DuyMinh.png" alt="Minh" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Duy Minh</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-500">10:15 PM</span>
                        </div>
                    </div>

                    {/* Right Message */}
                    <div className="flex items-end justify-end space-x-3">
                        <div className="text-right">
                            <h3 className="font-semibold">You</h3>
                            <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-400">10:15 PM</span>
                        </div>
                        <img src="/images/HoangVi.png" alt="You" className="w-10 h-10 rounded-full" />
                    </div>

                    {/* Another Left Message */}
                    <div className="flex items-start space-x-3">
                        <img src="/images/LongNguyen.jpg" alt="Long Nguyen" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Long Nguyen</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-500">10:17 PM</span>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <img src="/images/NhanPhan.png" alt="Nhan" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Nhan Phan</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Hello
                            </div>
                            <span className="text-xs text-gray-500">10:18 PM</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <img src="/images/NhanPhan.png" alt="Nhan" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-semibold">Nhan Phan</h3>
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                                Mai đi cà phê học bài
                            </div>
                            <span className="text-xs text-gray-500">10:20 PM</span>
                        </div>
                    </div>
                </div>


                {/* Chat Input */}
                <div className="p-4 border-t flex items-center bg-white">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-lg outline-none"
                        placeholder="Type a message..."
                    />
                    <button className="ml-3 bg-blue-600 text-white p-3 rounded-lg flex items-center">
                        <FaSearch className="text-lg" />
                        <span className="ml-2">Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}




