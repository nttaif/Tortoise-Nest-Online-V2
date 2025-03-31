"use client"

import { useState } from "react"
import type { User } from "../types/user"
import { UserCard } from "./user-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  const [activeTab, setActiveTab] = useState("all")

  const teachers = users.filter((user) => user.role === "teacher")
  const students = users.filter((user) => user.role === "student")
  const displayUsers = activeTab === "all" ? users : activeTab === "teachers" ? teachers : students

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Danh sách người dùng</h2>
          <TabsList>
            <TabsTrigger value="all">Tất cả ({users.length})</TabsTrigger>
            <TabsTrigger value="teachers">Giảng viên ({teachers.length})</TabsTrigger>
            <TabsTrigger value="students">Học viên ({students.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

