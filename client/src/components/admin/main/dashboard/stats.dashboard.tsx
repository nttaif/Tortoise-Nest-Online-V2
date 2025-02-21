'use client'
import React from 'react'
import { Users, UserPen, CalendarRange, BookOpenText } from "lucide-react";

export default function StatsDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { title: "Students", value: "93K", icon: <Users color="white" />, color: "#4D44B5" },
      { title: "Teachers", value: "74K", icon: <UserPen color="white" />, color: "#FB7D5B" },
      { title: "Events", value: "40K", icon: <CalendarRange color="white" />, color: "#fcc43e" },
      { title: "Courses", value: "32K", icon: <BookOpenText color="white" />, color: "#303972" },
    ].map((item, index) => (
      <div key={index} className="bg-white p-4 shadow rounded-lg flex items-center">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full`} style={{ backgroundColor: item.color }}>
          {item.icon}
        </div>
        <div className="p-3">
          <h2 className="text-[#a098ae]">{item.title}</h2>
          <p className="text-2xl font-bold text-[#303972]">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
  )
}
