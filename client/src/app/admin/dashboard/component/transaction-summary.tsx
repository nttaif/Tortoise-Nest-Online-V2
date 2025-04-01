"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockTransactions, mockCourses } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const COLORS = ["#4ade80", "#f87171", "#facc15", "#60a5fa"]

export function TransactionSummary() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      (typeof transaction.userId === "string" && transaction.userId.includes(searchTerm)) ||
      (typeof transaction.courseId === "string" && transaction.courseId.includes(searchTerm)) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.paymentMethod && transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Generate transaction status data
  const statusData = [
    { name: "Success", value: mockTransactions.filter((t) => t.status === "Success").length },
    { name: "Failed", value: mockTransactions.filter((t) => t.status === "Failed").length },
    { name: "Pending", value: mockTransactions.filter((t) => t.status === "Pending").length },
    { name: "Cancel", value: mockTransactions.filter((t) => t.status === "Cancel").length },
  ]

  // Generate monthly transaction data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2023, i, 1).toLocaleString("default", { month: "short" })
    return {
      name: month,
      success: Math.floor(Math.random() * 5000) + 1000,
      failed: Math.floor(Math.random() * 1000) + 100,
    }
  })

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Transaction List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        </div>
      </div>

      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>A list of all transactions with their details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.slice(0, 10).map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-medium">
                      {typeof transaction.userId === "string"
                        ? transaction.userId.substring(0, 8)
                        : transaction.userId.name || "User"}
                    </TableCell>
                    <TableCell>
                      {typeof transaction.courseId === "string"
                        ? mockCourses.find((c) => c._id === transaction.courseId)?.name ||
                          transaction.courseId.substring(0, 8)
                        : transaction.courseId?.name}
                    </TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Success"
                            ? "default"
                            : transaction.status === "Pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.paymentMethod || "N/A"}</TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
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
              <CardTitle>Transaction Status</CardTitle>
              <CardDescription>Distribution of transactions by status</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
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
              <CardTitle>Monthly Transaction Volume</CardTitle>
              <CardDescription>Transaction volume by month</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="success" name="Successful" fill="#4ade80" />
                  <Bar dataKey="failed" name="Failed" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

