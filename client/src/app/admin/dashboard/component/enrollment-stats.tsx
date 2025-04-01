"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockEnrollments, mockCourses } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function EnrollmentStats() {
  // Generate enrollment trend data
  const enrollmentTrend = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2023, i, 1).toLocaleString("default", { month: "short" })
    return {
      name: month,
      active: Math.floor(Math.random() * 100) + 50,
      pending: Math.floor(Math.random() * 30) + 10,
      cancelled: Math.floor(Math.random() * 15) + 5,
    }
  })

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="list">Enrollment List</TabsTrigger>
        <TabsTrigger value="trends">Enrollment Trends</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEnrollments.length}</div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockEnrollments.filter((e) => e.enrollmentStatus === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15) + 10}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockEnrollments.filter((e) => e.enrollmentStatus === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">-{Math.floor(Math.random() * 10) + 2}% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enrollment Status Distribution</CardTitle>
            <CardDescription>Overview of enrollment statuses across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#4ade80" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#facc15" strokeWidth={2} />
                <Line type="monotone" dataKey="cancelled" stroke="#f87171" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment List</CardTitle>
            <CardDescription>A list of all enrollments with their details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEnrollments.slice(0, 10).map((enrollment) => (
                  <TableRow key={enrollment._id}>
                    <TableCell className="font-medium">
                      {typeof enrollment.userId === "string"
                        ? enrollment.userId.substring(0, 8)
                        : enrollment.userId.name || "User"}
                    </TableCell>
                    <TableCell>
                      {typeof enrollment.courseId === "string"
                        ? mockCourses.find((c) => c._id === enrollment.courseId)?.name ||
                          enrollment.courseId.substring(0, 8)
                        : enrollment.courseId.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          enrollment.enrollmentStatus === "active"
                            ? "default"
                            : enrollment.enrollmentStatus === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {enrollment.enrollmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {enrollment.transactionId
                        ? typeof enrollment.transactionId === "string"
                          ? enrollment.transactionId.substring(0, 8)
                          : `$${enrollment.transactionId.amount}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{new Date(enrollment.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Enrollment Trends</CardTitle>
            <CardDescription>Enrollment trends over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  name="Active Enrollments"
                  stroke="#4ade80"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pending" name="Pending Enrollments" stroke="#facc15" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  name="Cancelled Enrollments"
                  stroke="#f87171"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

