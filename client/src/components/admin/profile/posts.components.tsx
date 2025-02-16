"use client";

import React, { useState } from "react";
import Image from "next/image";


export default function PostsComponent() {
    return (
        <div>
            {/* Post Input */}
            <div className="mb-4 border rounded-lg p-3 shadow-sm">
                <textarea
                    className="w-full h-32 p-2  rounded-sm text-sm border border-black"
                    placeholder="Please type what you want..."
                ></textarea>

                <div className="flex mt-5 space-x-2">
                    <button className="p-2 border rounded-md hover:bg-gray-200 bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>


                    </button>
                    <button className="p-2 border rounded-md hover:bg-gray-200  bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>

                    </button>
                    <button className="p-2 bg-blue-800 text-base text-white rounded">Post</button>
                </div>
                <div className="relative  h-96  rounded-sm  w-full   px-6 space-y-2  overflow-hidden mt-6">
                    <Image
                        src="/images/h1.png"
                        alt="h1"
                        layout="fill"
                        objectFit="cover"
                    />

                </div>

                <div className="p-4">
                    <h2 className="text-lg font-bold text-black">
                        How To Get (A) Fabulous EDUCATION On A Tight Budget
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                    </p>
                </div>
                {/* Post Actions */}
                <div className="flex p-4 border-t">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Like
                    </button>
                    <button className="ml-2 flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                        Reply
                    </button>
                </div>

                <div className="relative  h-96  rounded-sm  w-full   px-6 space-y-2  overflow-hidden mt-6">
                    <Image
                        src="/images/h1.png"
                        alt="h1"
                        layout="fill"
                        objectFit="cover"
                    />

                </div>

                <div className="p-4">
                    <h2 className="text-lg font-bold text-black">
                        How To Get (A) Fabulous EDUCATION On A Tight Budget
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                    </p>
                </div>
                {/* Post Actions */}
                <div className="flex p-4 border-t">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Like
                    </button>
                    <button className="ml-2 flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                        Reply
                    </button>
                </div>
                <div className="relative  h-96  rounded-sm  w-full   px-6 space-y-2  overflow-hidden mt-6">
                    <Image
                        src="/images/h1.png"
                        alt="h1"
                        layout="fill"
                        objectFit="cover"
                    />

                </div>

                <div className="p-4">
                    <h2 className="text-lg font-bold text-black">
                        How To Get (A) Fabulous EDUCATION On A Tight Budget
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                    </p>
                </div>
                {/* Post Actions */}
                <div className="flex p-4 border-t">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Like
                    </button>
                    <button className="ml-2 flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                        Reply
                    </button>
                </div>

            </div>

        </div>

    );
}
