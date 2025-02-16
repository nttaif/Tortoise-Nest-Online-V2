"use client";

import React, { useState } from "react";
import PostsComponent from "@/components/admin/profile/posts.components";
import AboutmeComponent from "@/components/admin/profile/aboutme.component";
import SettingComponent from "@/components/admin/profile/setting.component";


export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="space-y-2  ">

      <div className="bg-white shadow-lg rounded-sm w-full h-80  mx-auto overflow-hidden">
        <div className="relative h-40 w-full">
          <img
            src="/images/cover.png"
            alt="Cover"
            className="w-full h-60 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6 flex items-center relative">
          {/* Avatar */}
          <div className="absolute top-1/2 left-6 transform -translate-y-1/2 border-4  border-white rounded-full overflow-hidden w-36 h-36 shadow-md">
            <img src="/images/avatar.png"
              alt="Avatar"
              className=" w-full h-full object-cover rounded-full" />

          </div>

          {/* User Info */}
          <div className="ml-40 mt-14">
            <h2 className="text-lg font-semibold ">Quynh Ngo</h2>
            <p className="text-gray-500 text-sm">UX / UI Designer</p>
            <p className="text-gray-600 text-sm font-medium">quynhngoo123@email.com</p>
          </div>

          {/* More Options */}
          <div className="ml-auto mt-auto">


            <button className="p-2 border rounded-md hover:bg-gray-200 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="  grid grid-cols-1 lg:grid-cols-3 gap-10 py-4">
        <div className="space-y-6" >
          <div className="shadow-lg rounded-sm w-full  mx-auto overflow-hidden col-span-1 bg-stone-200 flex flex-col items-center justify-center px-6 py-4 space-y-4">
            {/* Thống kê */}
            <div className="flex space-x-16 text-center">
              <div>
                <p className="text-xl font-semibold">150</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold">140</p>
                <p className="text-sm text-gray-500">Place Stay</p>
              </div>
              <div>
                <p className="text-xl font-semibold">45</p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-bold">
                Follow
              </button>
              <button className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-bold">
                Send Message
              </button>
            </div>
          </div>


          <div className="shadow-lg rounded-sm  w-full mx-auto  col-span-1 bg-stone-200 flex flex-col px-6 space-y-2">
            <h2 className="text-left text-base font-bold text-blue-800 mt-4">Today Highlights</h2>

            <img src="/images/h1.png"
              alt="Education"
              className="w-full h-40 object-cover" />

            <div className="p-3">
              <h3 className="text-lg font-bold ">Proof That EDUCATION Is Exactly What You Are Looking For</h3>
              <p className="text-sm text-gray-400 mt-2">
                A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
              </p>
            </div>
          </div>

          <div className="shadow-lg rounded-sm w-full mx-auto  col-span-1 bg-stone-200 flex flex-col px-6  ">
            <h2 className="text-left text-base font-bold text-blue-800 mt-4">Interest</h2>
            <div className="grid grid-cols-3 gap-1 mt-4 ">
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
              <img src="/images/h2.png"
                alt="h2"
                className="w-32 h-36 object-cover rounded-sm " />
            </div>
          </div>

          <div className="shadow-lg rounded-sm w-full mx-auto  col-span-1 bg-stone-200 flex flex-col px-6  ">
            <h2 className="text-left text-base font-bold text-blue-800 mt-4">Our Latest News</h2>
            <div className="space-y-4 mt-4">

              <div className="flex items-start space-x-3">
                <img
                  src="/images/h2.png"
                  alt="News 1"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-sm font-semibold ">
                    These Mistakes Will Destroy Your EDUCATION</h3>
                  <p className="text-sm text-gray-500">
                    I shared this on my fb wall a few months back, and I thought.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <img
                  src="/images/h2.png"
                  alt="News 1"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-sm font-semibold ">
                    Best 50 Tips For Eduction</h3>
                  <p className="text-sm text-gray-500">
                    I shared this on my fb wall a few months back, and I thought. </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <img
                  src="/images/h2.png"
                  alt="News 1"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-sm font-semibold ">
                    EDUCATION: This Is What Professionals</h3>
                  <p className="text-sm text-gray-500">
                    I shared this on my fb wall a few months back, and I thought.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="col-span-2 shadow-lg rounded-md w-full h-full mx-auto bg-stone-200 p-4">
          <div className="flex space-x-10 text-lg text-gray-600 border-b pb-3">
            <p className={`cursor-pointer ${activeTab === "posts" ? "text-blue-700 font-bold" : "hover:text-gray-800"}`} onClick={() => setActiveTab("posts")}>Posts</p>
            <p className={`cursor-pointer ${activeTab === "about" ? "text-blue-700 font-bold" : "hover:text-gray-800"}`} onClick={() => setActiveTab("about")}>About Me</p>
            <p className={`cursor-pointer ${activeTab === "settings" ? "text-blue-700 font-bold" : "hover:text-gray-800"}`} onClick={() => setActiveTab("settings")}>Setting</p>
          </div>

          {/* Render Component Based on Active Tab */}
          <div className="mb-6">
            {activeTab === "posts" && <PostsComponent />}
            {activeTab === "about" && <AboutmeComponent />}
            {activeTab === "settings" && <SettingComponent />}
          </div>
        </div>

      </div>
    </div>

  );
}
