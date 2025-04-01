"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockTeachers } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#fb923c", "#a78bfa"]

export function TeacherAnalytics() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.major.some((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Calculate education level distribution
  const educationData = mockTeachers.reduce((acc: any[], teacher) => {
    if (!teacher.educationLevel) return acc

    const existingLevel = acc.find((item) => item.name === teacher.educationLevel)
    if (existingLevel) {
      existingLevel.value += 1
    } else {
      acc.push({ name: teacher.educationLevel, value: 1 })
    }
    return acc
  }, [])

  // Calculate major distribution
  const majorData = mockTeachers.reduce((acc: any[], teacher) => {
    teacher.major.forEach((major) => {
      const existingMajor = acc.find((item) => item.name === major.name)
      if (existingMajor) {
        existingMajor.value += 1
      } else {
        acc.push({ name: major.name, value: 1, color: major.color })
      }
    })
    return acc
  }, [])

  // Calculate experience distribution
  const experienceRanges = [
    { range: "0-2 years", min: 0, max: 2 },
    { range: "3-5 years", min: 3, max: 5 },
    { range: "6-10 years", min: 6, max: 10 },
    { range: "11-15 years", min: 11, max: 15 },
    { range: "16+ years", min: 16, max: Number.POSITIVE_INFINITY },
  ]

  const experienceData = experienceRanges.map((range) => {
    const count = mockTeachers.filter(
      (teacher) => teacher.experienceYears >= range.min && teacher.experienceYears <= range.max,
    ).length
    return { name: range.range, value: count }
  })

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Search teachers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button type="submit" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        </div>
      </div>

      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Teacher List</CardTitle>
            <CardDescription>A list of all teachers with their details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teacher.avartar} alt={`${teacher.firstName} ${teacher.lastName}`} />
                          <AvatarFallback>
                            {teacher.firstName[0]}
                            {teacher.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">{teacher.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.major.map((major, index) => (
                          <Badge key={index} style={{ backgroundColor: major.color }}>
                            {major.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{teacher.educationLevel || "N/A"}</TableCell>
                    <TableCell>{teacher.experienceYears} years</TableCell>
                    <TableCell>
                      <Badge variant={teacher.isActive ? "default" : "secondary"}>
                        {teacher.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedTeacher(teacher)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Teacher Profile</DialogTitle>
                            <DialogDescription>
                              Detailed information about {teacher.firstName} {teacher.lastName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={teacher.avartar} alt={`${teacher.firstName} ${teacher.lastName}`} />
                                <AvatarFallback className="text-lg">
                                  {teacher.firstName[0]}
                                  {teacher.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-bold">
                                  {teacher.firstName} {teacher.lastName}
                                </h3>
                                <p className="text-muted-foreground">{teacher.role}</p>
                                <p className="text-sm">{teacher.email}</p>
                                <div className="flex gap-2 mt-2">
                                  {teacher.major.map((major, index) => (
                                    <Badge key={index} style={{ backgroundColor: major.color }}>
                                      {major.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Personal Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <span className="font-medium">Address:</span> {teacher.address}
                                  </p>
                                  <p>
                                    <span className="font-medium">Education:</span> {teacher.educationLevel || "N/A"}
                                  </p>
                                  <p>
                                    <span className="font-medium">Experience:</span> {teacher.experienceYears} years
                                  </p>
                                  <p>
                                    <span className="font-medium">Status:</span>{" "}
                                    {teacher.isActive ? "Active" : "Inactive"}
                                  </p>
                                  <p>
                                    <span className="font-medium">Joined:</span>{" "}
                                    {new Date(teacher.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Publications</h4>
                                {teacher.publications && teacher.publications.length > 0 ? (
                                  <ScrollArea className="h-[100px]">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                      {teacher.publications.map((pub, index) => (
                                        <li key={index}>{pub}</li>
                                      ))}
                                    </ul>
                                  </ScrollArea>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No publications</p>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Courses ({teacher.courses?.length || 0})</h4>
                              {teacher.courses && teacher.courses.length > 0 ? (
                                <ScrollArea className="h-[150px]">
                                  <div className="space-y-2">
                                    {teacher.courses.map((course, index) => (
                                      <div key={index} className="border rounded-md p-2">
                                        <div className="font-medium">{course.name}</div>
                                        <div className="text-sm text-muted-foreground">{course.category}</div>
                                        <div className="text-sm">${course.price.toFixed(2)}</div>
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              ) : (
                                <p className="text-sm text-muted-foreground">No courses assigned</p>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Education Level Distribution</CardTitle>
              <CardDescription>Distribution of teachers by education level</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={educationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {educationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Major Distribution</CardTitle>
              <CardDescription>Distribution of teachers by major</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={majorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {majorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Experience Distribution</CardTitle>
            <CardDescription>Distribution of teachers by years of experience</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Teachers" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active vs. Inactive Teachers</CardTitle>
              <CardDescription>Current teacher status distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Active", value: mockTeachers.filter((t) => t.isActive).length },
                      { name: "Inactive", value: mockTeachers.filter((t) => !t.isActive).length },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#4ade80" />
                    <Cell fill="#f87171" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses per Teacher</CardTitle>
              <CardDescription>Number of courses assigned to each teacher</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockTeachers.slice(0, 10).map((teacher) => ({
                    name: `${teacher.firstName} ${teacher.lastName.charAt(0)}.`,
                    courses: teacher.courses?.length || 0,
                  }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="courses" name="Number of Courses" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

